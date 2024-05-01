function Footer() {
  return (
    <div className="border-t mt-2">
      <div className="max-w-7xl mx-auto w-full p-4 flex gap-5 flex-wrap">
        <div className="flex flex-col gap-2 whitespace-nowrap flex-1">
          <h3 className="font-semibold">Support</h3>
          <ul className="flex flex-col text-sm gap-2 text-gray-700">
            <li>Help Center</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
            <li>Report neighborhood concern</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 whitespace-nowrap flex-1">
          <h3 className="font-semibold">Hosting</h3>
          <ul className="flex flex-col text-sm gap-2 text-gray-700">
            <li>Airhome your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Airbnb-friendly apartments</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 whitespace-nowrap flex-1">
          <h3 className="font-semibold">Airhome</h3>
          <ul className="flex flex-col text-sm gap-2 text-gray-700">
            <li>Newsroom</li>
            <li>New features</li>
            <li>Reservations</li>
            <li>Investors</li>
            <li>MSA Statement</li>
            <li>Emergency stays</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 whitespace-nowrap flex-1">
          <h3 className="font-semibold">Useful links</h3>
          <ul className="flex flex-col text-sm gap-2 text-gray-700">
            <li>Countries</li>
            <li>Our regions</li>
            <li>Our cities</li>
            <li>House finder</li>
            <li>All destinations</li>
            <li>Places of interest</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
