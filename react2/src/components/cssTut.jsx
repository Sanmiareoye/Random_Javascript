import { useEffect } from "react";

export default function Css() {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  });

  return (
    <body>
      <div class="box">1</div>
      <div class="box">2</div>
      <div class="box">3</div>
      <div class="box">4</div>
      <div class="box">5</div>
    </body>
  );
}
