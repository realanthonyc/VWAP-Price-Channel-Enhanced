// This Pine Script® code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Anthony C. https://x.com/anthonycxc

//@version=6
// -----------------------------------------------------------------------------
//  VWAP Price Channel Enhanced
//  - Adaptive VWAP-based price channel with Donchian high/low anchors
//  - Supports short-term and long-term length selection
//  - Dynamic timeframe input (custom or chart TF fallback)
//  - Trend direction detection (dir / dir2) for coloring and fills
//  - Clean visualization with semi-transparent upper/lower bands
//  Original: VWAP Price Channel (VPC) by SamRecio
// -----------------------------------------------------------------------------
indicator("VWAP Price Channel Enhanced", shorttitle="VWAP Price Channel Enhanced - v2.1.6 -", overlay=true)

// === Inputs ===
tf        = input.timeframe("", title="Timeframe")
len_short = input.int(20, title="Short-Term Length", minval=1)
len_long  = input.int(50, title="Long-Term Length",  minval=1)

// Resolve effective timeframe (if blank, fallback to chart TF)
res_tf = (tf == "" ? timeframe.period : tf)

// Decide whether to use long/short length based on the input TF (not the chart TF)
use_long    = str.contains(str.upper(res_tf), "W")
len_to_use  = use_long ? len_long : len_short

// === VWAP Price Channel Function ===
get_vpc(_len) =>
    // Persistent VWAPs for highs and lows
    var float h_vwap = high
    var float l_vwap = low
    float upper = na
    float lower = na

    // Explicit high/low source for Donchian extremes
    hst = ta.highest(high, _len)
    lst = ta.lowest(low,  _len)

    // Detect new extremes
    new_high = high == hst
    new_low  = low  == lst

    // VWAP reset on new extremes
    h_vwap := ta.vwap(high, new_high)
    l_vwap := ta.vwap(low,  new_low)

    // VWAP changes
    h_change = ta.change(h_vwap)
    l_change = ta.change(l_vwap)

    // Upper/Lower band step logic
    upper := new_high ? hst : (hst == hst[1] ? upper[1] + h_change : math.min(hst, upper[1] + h_change))
    lower := new_low  ? lst : (lst == lst[1] ? lower[1] + l_change : math.max(lst, lower[1] + l_change))

    // Midline
    _avg = math.avg(upper, lower)

    // Trend detection: dir = current bar, dir2 = persistent
    var int dir  = 0
    var int dir2 = 0
    dir  := new_high ? 1 : new_low ? -1 : 0
    dir2 := new_high ? 1 : new_low ? -1 : dir2[1]
    [upper, lower, _avg, hst, lst, dir, dir2]

// Call function on chosen TF (explicit ticker)
[upper, lower, mid, hst, lst, dir, dir2] = request.security(syminfo.tickerid, res_tf, get_vpc(len_to_use))

// === Display ===
u = plot(upper, title="Upper", color = dir == 1 ? color.rgb(0, 0, 0, 100) : color.new(color.rgb(255, 3, 62), 50), style=plot.style_linebr)
plot(mid,   title="Mid",   color = color.new(color.rgb(128, 128, 128), 50), display=display.none)
l = plot(lower, title="Lower", color = dir == -1 ? color.rgb(0, 0, 0, 100) : color.new(color.rgb(61, 170, 69), 50), style=plot.style_linebr)
c = plot(close, display=display.none, editable=false)

fill(u, c, dir2 == 1 ? color.rgb(0, 0, 0, 100) : color.new(color.rgb(255, 3, 62), 95), title="Fill")
fill(l, c, dir2 == -1 ? color.rgb(0, 0, 0, 100) : color.new(color.rgb(61, 170, 69), 95), title="Fill")

plot(hst, title="DC Upper", color=color.new(color.rgb(0, 77, 146), 25), display=display.none)
plot(lst, title="DC Lower", color=color.new(color.rgb(0, 77, 146), 25), display=display.none)