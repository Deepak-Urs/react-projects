import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, reset, incrementByAmount } from './counterSlice';
import { useState } from 'react';

const Counter = () => {
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState(0)

    const addValue = Number(incrementAmount) || 0;

    const resetAll = () => {
        setIncrementAmount(0)
        dispatch(reset())
    }

    return (
        <section>
            <h6 style={{display:"flex", alignContent: "center", justifyContent: "center"}}>Count Value application</h6>
            <p>{count}</p>
            <div>
                {/* 4 - Dispatcher */}
                <button onClick={() => dispatch(increment())}>+</button>
                <button onClick={() => dispatch(decrement())}>-</button>
            </div>

            <input type='text' value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)} />
            <div>
                <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Value</button>
                <button onClick={resetAll}>Reset</button>
            </div>
        </section>
    )
}

export default Counter
