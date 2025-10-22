import { use, useEffect, useState } from "react";

function Title() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div>
      <input
        placeholder="Change Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}

export default Title;
