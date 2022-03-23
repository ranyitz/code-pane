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
        style={{ width: "540px", height: "200px" }}
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
      />
    </div>
  );
};
