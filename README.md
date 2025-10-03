# VWAP Price Channel Enhanced for TradingView

**Author:** Anthony C. https://x.com/anthonycxc  
Original: [VWAP Price Channel by SamRecio](https://www.tradingview.com/script/Psnjpa2Y-VWAP-Price-Channel/)  

Pine Script® v6  

---

## Overview
This TradingView indicator plots an **enhanced VWAP Price Channel** that adapts dynamically to Donchian high/low anchors.  
It highlights the relationship between price and its VWAP-based channel, offering a clear view of trend continuation or potential reversals.

---

## Features
- **VWAP-based upper and lower bands** anchored on Donchian highs/lows  
- **Dynamic short/long length selection** (auto-switch between short-term and long-term lengths depending on timeframe)  
- **Custom timeframe input** (or fallback to chart timeframe)  
- **Trend direction detection** (`dir` and `dir2`) to drive band coloring and fill state  
- **Semi-transparent upper/lower band visualization** for cleaner charting  
- **Optional Breakout/Breakdown labels** (when enabled) to flag closes above/below the channel  

---

## Usage
- **Price near upper band** → possible breakout or overextension zone  
- **Price near lower band** → possible breakdown or oversold zone  
- **Midline** → acts as balance point between upper and lower bands  
- **Trend coloring**:
  - **dir2 = 1** → bullish state (fills/lines biased upward)  
  - **dir2 = -1** → bearish state (fills/lines biased downward)  
- Combine with volume (e.g. OBV, MAVOL) or other trend filters to confirm breakouts and reduce false signals.

---

## Installation
1. Open **TradingView → Pine Editor**  
2. Paste the script and save  
3. Click **Add to chart**  

---

## Notes
- Channels are VWAP-based, but anchored dynamically to Donchian highs/lows for adaptive responsiveness  
- Works across all timeframes (scalping to higher-timeframe trend following)  
- Transparency of bands makes it easy to overlay with other indicators  

---

## Changelog
- Please refer to release notes

---