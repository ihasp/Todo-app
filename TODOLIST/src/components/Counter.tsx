import { useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { decrement, increment } from "@/state/counter/counterslice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{count}</h2>
      <div className="flex justify-around" style={{ color: "white" }}>
        <Button onClick={() => dispatch(decrement())}>Zmniejsz</Button>
        <Button onClick={() => dispatch(increment())}>Zwiększ</Button>
      </div>
    </div>
  );
};

export default Counter;
