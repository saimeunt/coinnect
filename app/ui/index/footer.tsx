const Footer = () => {
  return (
    <footer className="mx-8 flex justify-between border-t border-gray-200 py-5">
      <p className="text-xs text-gray-900">Coinnect © {new Date().getFullYear()}</p>
      <p className="text-xs text-gray-900">Made with ❤️ by TNS</p>
    </footer>
  );
};

export default Footer;
