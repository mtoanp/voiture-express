import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer flex px-4 items-center justify-between w-full bg-gradient-to-r from-purple-500 to-blue-500 text-center text-sm text-white shadow-inner">
      <p>© 2025 Treasure hunt ❤️</p>
      <div className="version">v{__APP_VERSION__}</div>
    </footer>
  );
};

export default Footer;
