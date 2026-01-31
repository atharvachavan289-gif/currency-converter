import { useState } from 'react'
import InputBox from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import ChartComponent from './components/ChartComponent'

function App() {

    const [amount, setAmount] = useState(0)
    const [from, setFrom] = useState("usd")
    const [to, setTo] = useState("inr")
    const [convertedAmount, setConvertedAmount] = useState(0)
    const [isRotated, setIsRotated] = useState(false)
  
    const currencyInfo = useCurrencyInfo(from)

    const apiKeys = Object.keys(currencyInfo)
  const options = apiKeys.length > 0 
    ? [...new Set([from, to, "usd", "inr", ...apiKeys])]
    : ["usd", "inr"];

    const swap = () => {
      setIsRotated(true);
      setFrom(to)
      setTo(from)
      setConvertedAmount(amount)
      setAmount(convertedAmount)

      setTimeout(() => setIsRotated(false), 300);
    }

    const convert = () => {
      if (currencyInfo[to]){
      setConvertedAmount(amount * currencyInfo[to])
      }
    }

  return (
    <>
      
      <div
        className="w-full min-h-screen p-4 flex flex-col justify-center items-center bg-cover bg-no-repeat py-50"
        style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
}}
      >
        <div className="w-full px-4">
          <div className="w-full max-w-md mx-auto border border-white/20 rounded-xl p-6 backdrop-blur-md bg-white/30 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert()
              }}
            >
              <div className="w-full mb-1">
                <InputBox
                  label="From"
                  amount={amount}
                  currencyOptions={options}
                  onAmountChange={(amount) => setAmount(amount)}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
    type="button"
    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-blue-600 text-white p-2 hover:bg-blue-700 transition-all shadow-md"
    onClick={swap}
>
    {/* This is an SVG Icon (Up/Down Arrows) */}
    <svg className={`w-5 h-5 transition-transform duration-300 ${isRotated ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
</button>
              </div>
              <div className='w-full mt-1 mb-4'>
                <InputBox 
                label="To"
                  amount={convertedAmount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button type='submit'
    className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg active:scale-95'
>
    Convert {from.toUpperCase()} to {to.toUpperCase()}
</button>
            
            </form>
          </div>
        </div>

              <div className="w-full max-w-md px-4 mt-6">
  <div className="bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg">
    {currencyInfo[to] ? (
      <ChartComponent 
        from={from} 
        to={to} 
        currentRate={currencyInfo[to]} 
      />
    ) : (
      <div className="text-white text-center">Loading Chart...</div>
    )}
  </div>
</div>

              <p className="text-white font-bold text-lg mt-3 mb-2 text-center">For 1 {from.toUpperCase()} :</p>
           {currencyInfo && (
          <div className="w-full max-w-md px-4 mt-5">
            <div className="grid grid-cols-2 gap-4">
              {["inr","eur", "usd", "gbp", "jpy"].map((target) => {
                if (target === from) return null;
                const rate = currencyInfo[target];
                if (!rate) return null;
                return (
                  <div key={target} className="bg-white/20 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-center shadow-md hover:scale-105 transition-transform">
                    <div className="text-white/70 text-sm mb-1">{target.toUpperCase()}</div>
                    <div className="text-white font-bold text-lg">
                      {rate.toFixed(3)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}   

      </div>
    </>
  )
}

export default App
