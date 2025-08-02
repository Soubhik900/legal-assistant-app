export default function GovernmentFooter() {
  const footerSections = [
    {
      title: "Department of Justice",
      content: [
        "Ministry of Law and Justice",
        "Government of India"
      ]
    },
    {
      title: "Quick Links",
      links: [
        { name: "eCourts Services", href: "#" },
        { name: "National Judicial Data Grid", href: "#" },
        { name: "Fast Track Courts", href: "#" },
        { name: "Legal Aid Services", href: "#" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "eFiling", href: "#" },
        { name: "ePay", href: "#" },
        { name: "Case Management", href: "#" },
        { name: "Tele Law", href: "#" }
      ]
    },
    {
      title: "Contact",
      content: [
        "Helpline: 1800-XXX-XXXX",
        "Email: support@doj.gov.in",
        "Hours: 9:00 AM - 6:00 PM"
      ]
    }
  ];

  return (
    <footer className="bg-navy text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 font-[Noto_Sans]">{section.title}</h4>
              {section.content && (
                <div className="text-sm text-gray-300">
                  {section.content.map((item, itemIndex) => (
                    <p key={itemIndex}>{item}</p>
                  ))}
                </div>
              )}
              {section.links && (
                <ul className="space-y-2 text-sm">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href} 
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © 2024 Department of Justice, Ministry of Law and Justice, Government of India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
