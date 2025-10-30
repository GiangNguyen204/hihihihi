import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import './BirthdayCard.scss';

const BirthdayCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardOpened, setCardOpened] = useState(false);
  const [modalWidth, setModalWidth] = useState(800);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    if (day === 30 && month === 10) {
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const updateModalWidth = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setModalWidth(width * 0.96);
      } else if (width <= 768) {
        setModalWidth(width * 0.95);
      } else if (width <= 1024) {
        setModalWidth(650);
      } else if (width >= 1440) {
        setModalWidth(850);
      } else {
        setModalWidth(800);
      }
    };

    updateModalWidth();
    window.addEventListener('resize', updateModalWidth);
    return () => window.removeEventListener('resize', updateModalWidth);
  }, []);

  const handleOpenCard = () => {
    setCardOpened(true);

    setTimeout(() => {
      const cardInside = document.querySelector('.card-inside-right');
      if (cardInside) {
        cardInside.scrollTop = 0;
      }
    }, 100);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!cardOpened && (e.target as HTMLElement).closest('.card-front')) {
      handleOpenCard();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCardOpened(false);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={modalWidth}
      centered
      closeIcon={<span className="birthday-card-close">✕</span>}
      className="birthday-card-modal"
      maskStyle={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(5px)',
      }}
    >
      <div className="birthday-card-container">
        <div className="confetti-bg">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe'][
                  Math.floor(Math.random() * 6)
                ],
              }}
            />
          ))}
        </div>

        <div className={`birthday-card ${cardOpened ? 'opened' : ''}`} onClick={handleCardClick}>
          <div className="card-front">
            <div className="card-front-content">
              <div className="card-decoration">
                <div className="stars-decoration">
                  <span className="star star-1">⭐</span>
                  <span className="star star-2">✨</span>
                  <span className="star star-3">⭐</span>
                  <span className="star star-4">✨</span>
                </div>
                <div className="balloons">
                  <span className="balloon balloon-1">🎈</span>
                  <span className="balloon balloon-2">🎈</span>
                  <span className="balloon balloon-3">🎈</span>
                  <span className="balloon balloon-4">🎈</span>
                  <span className="balloon balloon-5">🎈</span>
                </div>
                <h2 className="card-title">
                  <span className="title-text">Chúc Mừng Sinh Nhật</span>
                  <span className="title-emoji">🎉🎂🎊</span>
                </h2>
                <div className="date-badge">30 • 10</div>
                <div className="gift-icon">🎁</div>
                <p className="tap-to-open" onClick={handleOpenCard}>
                  <span className="tap-icon">👆</span>
                  Nhấn để mở thiệp
                  <span className="arrow-icon">→</span>
                </p>
              </div>
            </div>
          </div>

          <div className="card-inside">
            <div className="card-inside-left">
              <div className="flower-decoration">
                <div className="flower">🌸</div>
                <div className="flower">🌺</div>
                <div className="flower">🌻</div>
                <div className="flower">🌷</div>
                <div className="flower">🌹</div>
              </div>
            </div>

            <div className="card-inside-right">
              <div className="birthday-message">
                <div className="crown-icon">👑</div>
                <h3 className="recipient-name">
                  <span className="sparkle">✨</span>
                  Nguyễn Thúy Hằng
                  <span className="sparkle">✨</span>
                </h3>
                <p className="recipient-title">Developer & Creator</p>

                <div className="message-content">
                  <div className="message-block">
                    <p className="message-line text-center w-full align-middle">
                      <strong>Chúc mừng sinh nhật Hằng!</strong>
                    </p>
                  </div>
                </div>

                <div className="birthday-cake">
                  <div className="cake">
                    <div className="candles">
                      <div className="candle">
                        <div className="flame"></div>
                      </div>
                      <div className="candle">
                        <div className="flame"></div>
                      </div>
                      <div className="candle">
                        <div className="flame"></div>
                      </div>
                    </div>
                    <div className="cake-layers">
                      <div className="cake-layer cake-layer-1"></div>
                      <div className="cake-layer cake-layer-2"></div>
                      <div className="cake-layer cake-layer-3"></div>
                    </div>
                  </div>
                </div>

                <div className="signature">
                  <p className="signature-main">🎊 HAPPY BIRTHDAY 🎊</p>
                  <p className="signature-date">30 • October • 2025</p>
                  <p className="signature-text">— With love & appreciation —</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BirthdayCard;
