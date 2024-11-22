import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EventDetails.css";
import club from '../images/book-club-image.jpg'
import poetry from '../images/poetry.jpg'
import BOM from '../images/books-of-the-month.jpg'

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const allEvents = [
    {
      id: 1,
      title: "Join the CCL Book Club Now!",
      date: "December 1, 2024",
      description:
      (
        <>
        Unlock the joy of reading  with City Central Library's Book Club!
        Dive into captivating stories, share insights with fellow book lovers, and embark on literary adventures together. Discover new authors, explore diverse genres, and connect with like-minded individuals who share your passion for books. Join us for lively discussions, exclusive events, and a welcoming community that celebrates the power of storytelling. <br /> <br />
        Don't miss out—sign up for the Book Club today and enrich your reading journey!
        Step into a world of imagination and camaraderie by joining City Central Library's vibrant Book Club!
        Immerse yourself in compelling narratives, exchange thoughts with avid readers, and delve into the magic of literature together. <br /> <br />
        Experience the thrill of discovering hidden gems, delving into different literary styles, and building lasting friendships centered around books.
        Be part of our engaging discussions, special gatherings, and a warm community that cherishes the art of storytelling. Embrace the joy of reading with us—enroll in the Book Club today and let your literary journey flourish! <br /> <br />
        Experience the excitement of City Central Library's Book Club and open the door to a universe of literary wonders!
        Engage in captivating plots, share your favorite reads with fellow enthusiasts, and embark on a journey of literary exploration. <br /> <br />
        Dive into a world of diverse voices, discover fresh perspectives, and connect with a passionate community dedicated to the love of books.
        Participate in thought-provoking conversations, attend exclusive events, and be part of a welcoming space that celebrates the beauty of storytelling. Unleash your imagination—join our Book Club now and let the adventures begin!`
        </>
    ),
        image: club,
    },
    {
      id: 2,
      title: "Poetry Competition Starting Soon",
      date: "December 10, 2024",
      description:
      (
        <>
        Embark on a literary journey curated by our very own readers with the Best Book of the Month at City Central Library, chosen through a collective poll!
        Every month, we invite our vibrant community of book enthusiasts to vote for their favorite read, resulting in a selection that reflects the diverse tastes and preferences of our avid readers. This month's winning book promises to captivate your imagination, evoke a range of emotions, and spark engaging discussions among fellow bibliophiles. Join us in celebrating the power of reader-driven recommendations and dive into a captivating story that has earned the title of our Best Book of the Month!<br/><br/>
        At City Central Library, we believe in the collective wisdom of our reading community, which is why we entrust our Best Book of the Month selection to the voices of our readers.
        Whether you're drawn to gripping mysteries, heartwarming romances, thought-provoking non-fiction, or captivating fantasy worlds, our reader-poll-selected book is sure to pique your interest and leave a lasting impression. Engage with fellow readers, share your thoughts, and explore the themes and characters that have resonated with our community, making this book a standout choice for this month's spotlight.<br/><br/>
        What makes for a happy life, a fulfilling life? A good life?
        In their book, the directors of the Harvard Study of Adult Development, the longest scientific study of happiness ever conducted, show that the answer to these questions may be closer than you realize. What makes a life fulfilling and meaningful? The simple but surprising answer is: relationships. The stronger our relationships, the more likely we are to live happy, satisfying, and healthier lives. In fact, the Harvard Study of Adult Development reveals that the strength of our connections with others can predict the health of both our bodies and our brains as we go through life.   
        Let me know if you would like me to extract the text from any other images!
        </>
      ),
      image: poetry,
    },
    {
      id: 3,
      title: "Our readers' Book of the Month",
      date: "December 25, 2024",
      description:
      (
        <>
        <strong>Calling all wordsmiths and poets!</strong><br/><br/>
        Get ready to unleash your creativity in the upcoming Poetry Competition at City Central Library. Whether you're a seasoned poet or just starting to explore the world of verse, this competition is your chance to shine. Share your unique voice, express your emotions, and weave words into captivating poems that resonate with the heart and soul. Embrace the power of poetry to inspire, provoke thought, and connect with others in profound ways.<br/><br/>
        <strong>Join us in celebrating the beauty of language and the artistry of poetic expression!</strong> <br/><br/>
        The Poetry Competition at City Central Library is a platform for both aspiring and established poets to showcase their talent and passion for literature. Dive into the depths of your imagination, draw inspiration from life's experiences, and craft poems that evoke a range of emotions. Whether you prefer traditional forms or experimental styles, this competition welcomes all forms of poetic expression. Let your words paint vivid pictures, evoke nostalgia, or stir the depths of the human spirit. Participate in a community of fellow poets, share your love for language, and contribute to a celebration of creativity and art.<br/><br/>
        <strong>Are you ready to be part of something extraordinary?</strong><br/><br/>
        The Poetry Competition at City Central Library invites you to be a part of a literary journey that celebrates the power of words. Engage with themes that ignite your passion, explore different poetic structures, and let your imagination run wild on the blank canvas of poetry. Beyond the competition, this event is an opportunity to connect with fellow poets, receive constructive feedback, and grow as an artist. Embrace the challenge, unleash your poetic prowess, and join us in shaping a vibrant tapestry of verse and creativity. Step into the world of poetry and make your voice heard!
        </>
      ),
      image: BOM,
    },
  ];

  // Find the event by ID
  const event = allEvents.find((event) => event.id === parseInt(id));

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div className="event-details-container">
      {/* Event Image */}
      <div className="event-image">
        <img src={event.image} alt={event.title} />
      </div>

      {/* Event Information */}
      <div className="event-content">
        <h1>{event.title}</h1>
        <p className="event-date">{event.date}</p>
        <p className="event-description">{event.description}</p>

        <div className="buttons">
          <button onClick={() => navigate(-1)} className="back-btn">
            Go Back
          </button>
          <button onClick={() => setShowForm(true)} className="register-btn">
            Register
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Register for {event.title}</h2>
            <form>
              <label>
                Name:
                <input type="text" required />
              </label>
              <label>
                Email:
                <input type="email" required />
              </label>
              <label>
                Comments:
                <textarea rows="3"></textarea>
              </label>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default EventDetails;
