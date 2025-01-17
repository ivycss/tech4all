import React, { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import styles from "../src/css/AreaUtente.module.css";
import Link from "next/link";
import ApiControllerFacade from "@/controller/ApiControllerFacade";

const UserPage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [userData, setUserData] = useState({
    id: 0,
    nome: "",
    cognome: "",
    email: "",
    quiz_superati: 0,
  });
  const [feedbackList, setFeedbackList] = useState<any[]>([]); // Per gestire i feedback ricevuti
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("Anagrafica");

  useEffect(() => {
    console.log(user);
    if (user) {
      setUserData({
        id: user.id,
        nome: user.nome || "",
        cognome: user.cognome || "",
        email: user.email || "",
        quiz_superati: user.quizSuperati || 0,
      });
      if (activeTab === "Feedback") {
        fetchUserFeedback(user.id);
      }
    }
  }, [user, activeTab]);

  const fetchUserFeedback = async (userId: number) => {
    try {
      const feedback = await ApiControllerFacade.getFeedbackByUserId(userId);
      setFeedbackList(feedback);
    } catch (error) {
      console.error("Errore durante il recupero dei feedback:", error);
      setFeedbackList([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateUser(userData);
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Anagrafica":
        return (
          <>
            <div className={styles.profileInfo}>
              <div className={styles.profileRow}>
                <span>Nome:</span>
                <span>{userData.nome}</span>
              </div>
              <div className={styles.profileRow}>
                <span>Cognome:</span>
                <span>{userData.cognome}</span>
              </div>
              <div className={styles.profileRow}>
                <span>Email:</span>
                <span>{userData.email}</span>
              </div>
              <div className={styles.profileRow}>
                <span>Quiz Superati:</span>
                <span>{userData.quiz_superati}</span>
              </div>
            </div>
          </>
        );
      case "Feedback":
        return (
          <div className={styles.feedbackContainer}>
            <h2>Feedback</h2>
            <p>Qui puoi vedere i feedback ricevuti per i quiz completati.</p>
            {feedbackList.length === 0 ? (
              <p>Nessun feedback disponibile.</p>
            ) : (
              <ul>
                {feedbackList.map((feedback, index) => (
                  <li key={index}>
                    <strong>Valutazione:</strong> {feedback.valutazione} <br />
                    <strong>Commento:</strong> {feedback.commento}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "Obiettivi":
        const renderBadge = () => {
          const badges = [
            {
              threshold: 1,
              label: "Livello:Principiante",
              image: "/Media/badge-1.png",
            },
            {
              threshold: 3,
              label: "Livello:Intermedio",
              image: "/Media/badge-2.jpg",
            },
            {
              threshold: 5,
              label: "Livello:Esperto",
              image: "/Media/badge-3.png",
            },
          ];

          const unlockedBadge = badges
            .reverse()
            .find((badge) => user.quizSuperati >= badge.threshold);

          return unlockedBadge ? (
            <div className={styles.badge}>
              <img src={unlockedBadge.image} alt={unlockedBadge.label} />
              <p>{unlockedBadge.label}</p>
            </div>
          ) : (
            <p>
              Non hai ancora ottenuto alcun badge. Completa più quiz per
              sbloccarli!
            </p>
          );
        };

        return (
          <div className={styles.goalsContainer}>
            <h2>Obiettivi</h2>
            <p>Completa quiz per ottenere badge esclusivi!</p>
            <div className={styles.legend}>
              <h3>Legenda:</h3>
              <ul>
                <li>1 Quiz superato: Primo Badge</li>
                <li>3 Quiz superati: Secondo Badge</li>
                <li>5 Quiz superati: Terzo Badge</li>
              </ul>
            </div>
            <div className={styles.badgeContainer}>{renderBadge()}</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "Anagrafica" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("Anagrafica")}
        >
          Anagrafica
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "Obiettivi" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("Obiettivi")}
        >
          Obiettivi
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "Feedback" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("Feedback")}
        >
          Feedback
        </button>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.profileContainer}>
          {activeTab === "Anagrafica" && (
            <div className={styles.avatarPlaceholder}>
              <img src="/Media/areaUtente.png" alt="Avatar" />
            </div>
          )}
          {renderContent()}
        </div>
        <div className={styles.homeButtonContainer}>
          <Link href="/homepage">
            <button className={styles.homeButton}>Torna alla home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
