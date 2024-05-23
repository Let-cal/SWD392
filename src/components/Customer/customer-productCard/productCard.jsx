import "./productCard.css";

const Card = ({ image, alt, title, description, tags }) => {
  return (
    <div className="card">
      <div className="card-inner" style={{ "--clr": "#fff" }}>
        <div className="box">
          <div className="imgBox">
            <img src={image} alt={alt} />
          </div>
          <div className="icon">
            <a href="#" className="iconBox">
              <span className="material-symbols-outlined">arrow_outward</span>
            </a>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{title}</h3>
        <p>{description}</p>
        <ul>
          {tags.map((tag, index) => (
            <li
              key={index}
              style={{ "--clr-tag": tag.color }}
              className={tag.className}
            >
              {tag.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TrustedCompanies = () => {
  const cardsData = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Trust & Co.",
      title: "trust & co.",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d4d0e0c41c27a8ba8bf6d968218df6cc3aed36f2b2acc3b20439a7031c87c463?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Tonic",
      title: "tonic",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d4d0e0c41c27a8ba8bf6d968218df6cc3aed36f2b2acc3b20439a7031c87c463?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/a9e977caf29eb1b2eec1c3fae1d3171f992fe449c6cf1451fc6304cc7ed72cd8?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/85b98ed4e25a833586bc54c1d5c6457cfd243aeb3bf5249ca27fbce37631719b?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aae30422978342647c8d0d9193c8a66845f2bb0ae55e2f8c4877d6f67f292156?apiKey=2cf111b7142f4a06bfb2b5c186f14037&",
      alt: "Shower Gel",
      title: "shower gel",
      description:
        "Fill out the form and the algorithm will offer the right team of experts",
      tags: [
        { name: "branding", color: "#d3b19a", className: "branding" },
        { name: "packaging", color: "#70b3b1", className: "packaging" },
        { name: "marketing", color: "#d05fa2", className: "marketing" },
      ],
    },
  ];

  return (
    <section>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <h2>
        leading companies
        <br />
        <div className="shrink-0 mt-2.5 h-px bg-black border border-black border-solid"></div>
        have trusted us
      </h2>

      <div className="container-product-card">
        {cardsData.map((card, index) => (
          <Card
            key={index}
            image={card.image}
            alt={card.alt}
            title={card.title}
            description={card.description}
            tags={card.tags}
          />
        ))}
      </div>
    </section>
  );
};

export default TrustedCompanies;
