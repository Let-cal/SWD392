import PropTypes from "prop-types";
import { useEffect } from "react";
import Card from "./Card.jsx";
const CardStack = ({ images }) => {
  useEffect(() => {
    const stack = document.querySelector(".stack");
    const CollectionCards = Array.from(stack.children)
      .reverse()
      .filter((child) => child.classList.contains("CollectionCard"));

    CollectionCards.forEach((CollectionCard) =>
      stack.appendChild(CollectionCard)
    );

    function moveCard() {
      const lastCard = stack.lastElementChild;
      if (lastCard.classList.contains("CollectionCard")) {
        lastCard.classList.add("swap");

        setTimeout(() => {
          lastCard.classList.remove("swap");
          stack.insertBefore(lastCard, stack.firstElementChild);
        }, 1200);
      }
    }

    stack.addEventListener("click", function (e) {
      const CollectionCard = e.target.closest(".CollectionCard");
      if (CollectionCard && CollectionCard === stack.lastElementChild) {
        CollectionCard.classList.add("swap");

        setTimeout(() => {
          CollectionCard.classList.remove("swap");
          stack.insertBefore(CollectionCard, stack.firstElementChild);
          resetAutoplay();
        }, 500);
      }
    });

    let autoplayInterval = setInterval(moveCard, 4000);

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(moveCard, 4000);
    }

    // Cleanup function to remove event listener and clear interval
    return () => {
      stack.removeEventListener("click", moveCard);
      clearInterval(autoplayInterval);
    };
  }, []);
  CardStack.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  return (
    <div className="stack">
      {images.map((src, index) => (
        <Card key={index} src={src} />
      ))}
    </div>
  );
};

export default CardStack;
