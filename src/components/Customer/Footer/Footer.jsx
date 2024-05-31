function Footer() {
  return (
    <>
      <div className="shrink-0 mt-64 max-w-full h-px border border-solid bg-zinc-300 border-zinc-300 w-[1249px] max-md:mt-10" />
      <div className="flex gap-5 self-end px-px mt-11 max-w-full text-base leading-7 text-neutral-500 w-[397px] max-md:mt-10 max-md:mr-2.5">
        <div className="flex-auto">Give an email, get the newsletter.</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4a81552353ddc6cf542340113428cce528e4e8dbfd18c5b359edfe4bba9e08f?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          alt="Right arrow icon"
          className="shrink-0 self-start mt-1.5 aspect-[2.78] fill-neutral-500 w-[25px]"
        />
      </div>
      <nav className="flex gap-5 self-start ml-4 text-base leading-7 text-neutral-500 max-md:flex-wrap">
        <div>CONTACT</div>
        <div className="flex-auto">TERMS OF SERVICES</div>
        <div className="flex-auto">SHIPPING AND RETURNS</div>
      </nav>
      <div className="shrink-0 self-end mt-1 max-w-full h-px bg-black border border-black border-solid w-[397px] max-md:mr-2.5" />
      <div className="flex gap-5 px-px mt-12 w-full text-base leading-7 max-w-[1249px] text-neutral-500 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div className="flex-auto">
          <span className="text-black">© 2021 Shelly.</span> Terms of use{" "}
          <span className="text-black">and</span> privacy policy.
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/af02bd9a2ee1530da7c8449ac2778fe498b1beba541832fdb1cd40c233aa31b2?apiKey=2cf111b7142f4a06bfb2b5c186f14037&"
          alt="Payment methods"
          className="shrink-0 self-start max-w-full aspect-[8.33] w-[156px]"
        />
      </div>
    </>
  );
}
export default Footer;
