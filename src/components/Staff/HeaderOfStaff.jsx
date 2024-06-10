function Header() {
  return (
    <header className="header-container flex items-center justify-between px-4 py-2 bg-gray-100 shadow-md">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/761a3e35369fc6c259c389bd4b678d676da11023c4860c23c48806e300fd51ea?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
        className="w-16 h-auto"
        alt=""
      />
      <div className="title-header text-3xl font-semibold relative">
        <span className="font-bold font-serif  bg-gradient-custom-header-title bg-clip-text text-transparent">
          Z
        </span>
        <span className="bg-gradient-custom-header-title font-serif bg-clip-text text-transparent">
          odiacGems
        </span>
      </div>
    </header>
  );
}

export default Header;
