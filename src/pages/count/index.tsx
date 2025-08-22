import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/stores";
import { searchUser } from "src/stores/apps/count";
import { increaseAction,descreaseAction } from "src/stores/apps/count/countAction";

const Count = () => {
 // const [count, setCount] = useState(1);
  const count = useSelector((state:RootState) => state.countSlide.count);
  const dispatch = useDispatch();
  const handIncrease = () =>{
    dispatch(increaseAction(count));
  }

  const handDeasecrease = () => {
    dispatch(searchUser(count))
  }

  return (<>
      <button onClick={handIncrease} > Increase</button>
            {count}
      <button onClick={handDeasecrease}> Decrease</button>
  </>)
}
export default Count;