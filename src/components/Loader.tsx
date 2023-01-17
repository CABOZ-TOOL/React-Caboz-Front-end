import { useState } from "react";

const Loader = () => {
  const [show, setShow] = useState(true);
  {
    setTimeout(function () {
      setShow(false);
    }, 1000)
  }
  return (
    <div>
      {show ? (
        <div id="overlay">
          <div className="spinner"></div>
          <br />
          Loading...
        </div>
      ) : <div></div>}
    </div>
  )
}

export default Loader