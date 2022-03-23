export const CodeEditor = ({ code, setCode }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <textarea
        style={{ width: "800px", height: "300px" }}
        height="500"
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
      />
    </div>
  );
};
