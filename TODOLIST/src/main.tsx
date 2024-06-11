import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import { TodoList } from "./TodoList.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <TodoList />
  </Provider>
);
