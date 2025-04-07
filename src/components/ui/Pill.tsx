const Pill = ({ children }: { children: string }) => {
  return (
    <button
      title="home"
      className="bg-brand-black-500 hover:bg-brand-black-400/50 w-fit cursor-pointer rounded-full px-3 py-1"
      aria-label={children}
    >
      <span className="text-sm">{children}</span>
    </button>
  );
};

export default Pill;
