import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LetterData } from '../../types/letter.types';
import { TypingLetter } from '../letter/TypingLetter';
import styles from './LetterScreen.module.css';

interface LetterScreenProps {
  letter: LetterData;
}

export const LetterScreen = ({ letter }: LetterScreenProps) => {
  const [isOpening, setIsOpening] = useState(true);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpening(false), 2550);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className={styles.screen}>
      <AnimatePresence mode="wait">
        {isOpening ? (
          <motion.div
            key="envelope"
            className={styles.envelopeWrap}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <motion.div
              className={styles.envelope}
              initial={{ y: 8, rotateX: 0 }}
              animate={{ y: [8, 0, 2, 0], rotateX: [0, 0, -1.3, 0] }}
              transition={{ duration: 2.1, ease: 'easeInOut', times: [0, 0.3, 0.7, 1] }}
            >
              <motion.div
                className={styles.flap}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: [0, -132, -176] }}
                transition={{
                  duration: 1.1,
                  delay: 0.18,
                  ease: [0.25, 1, 0.5, 1],
                  times: [0, 0.72, 1],
                }}
              />

              <motion.div
                className={styles.paper}
                initial={{ y: 64, rotate: 0.4, opacity: 0.8 }}
                animate={{ y: [64, 46, -26, -98], rotate: [0.4, 0.3, -0.6, -1.2], opacity: [0.8, 0.92, 1, 1] }}
                transition={{
                  duration: 1.45,
                  delay: 0.52,
                  ease: [0.2, 0.9, 0.25, 1],
                  times: [0, 0.26, 0.74, 1],
                }}
              >
                <span className={styles.paperLine} />
                <span className={styles.paperLine} />
                <span className={styles.paperLine} />
                <span className={styles.paperLineShort} />
              </motion.div>

              <div className={styles.pocketLeft} />
              <div className={styles.pocketRight} />
              <div className={styles.pocketBottom} />

              <motion.div
                className={styles.seal}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 0.92, 0], opacity: [1, 1, 0] }}
                transition={{ duration: 0.4, delay: 0.44, ease: 'easeInOut' }}
              />
            </motion.div>
            <p className={styles.openingText}>Opening your letter...</p>
          </motion.div>
        ) : (
          <motion.div
            key={isGiftOpen ? 'gift' : 'letter'}
            className={isGiftOpen ? styles.giftScreen : styles.letterReveal}
            initial={
              isGiftOpen
                ? { opacity: 0 }
                : { opacity: 0, y: -90, scaleY: 0.7, scaleX: 0.94, transformOrigin: '50% 100%' }
            }
            animate={isGiftOpen ? { opacity: 1 } : { opacity: 1, y: 0, scaleY: 1, scaleX: 1 }}
            transition={{ duration: 0.72, ease: [0.2, 0.85, 0.25, 1] }}
          >
            {isGiftOpen && letter.gift ? (
              <div className={styles.giftContent}>
                <div className={styles.screenSparkles} aria-hidden="true">
                  {Array.from({ length: 12 }, (_, index) => (
                    <span key={index} />
                  ))}
                </div>
                <motion.figure
                  className={styles.gift}
                  initial={{ opacity: 0, y: 34, scale: 0.88, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.65, ease: [0.2, 0.9, 0.25, 1] }}
                >
                  <div className={styles.giftGlow} aria-hidden="true" />
                  <div className={styles.giftImageWrap}>
                    <img
                      className={styles.giftImage}
                      src={letter.gift.image}
                      alt={letter.gift.alt}
                    />
                    <span className={`${styles.sparkle} ${styles.sparkleOne}`} aria-hidden="true" />
                    <span className={`${styles.sparkle} ${styles.sparkleTwo}`} aria-hidden="true" />
                    <span className={`${styles.sparkle} ${styles.sparkleThree}`} aria-hidden="true" />
                    <span className={`${styles.sparkle} ${styles.sparkleFour}`} aria-hidden="true" />
                    <span className={`${styles.sparkle} ${styles.sparkleFive}`} aria-hidden="true" />
                    <span className={`${styles.sparkle} ${styles.sparkleSix}`} aria-hidden="true" />
                    <span className={`${styles.sparkle} ${styles.sparkleSeven}`} aria-hidden="true" />
                    <span className={`${styles.sparkle} ${styles.sparkleEight}`} aria-hidden="true" />
                  </div>
                  <figcaption className={styles.giftMessage}>{letter.gift.message}</figcaption>
                </motion.figure>
                <button
                  className={styles.backButton}
                  type="button"
                  onClick={() => setIsGiftOpen(false)}
                >
                  Back to Letter
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  className={styles.letterTrail}
                  initial={{ opacity: 0, scaleY: 0.5, y: 40 }}
                  animate={{ opacity: [0, 0.36, 0], scaleY: [0.5, 1.05, 1.2], y: [40, 10, -6] }}
                  transition={{ duration: 0.68, ease: 'easeOut', times: [0, 0.42, 1] }}
                  aria-hidden="true"
                />
                <h2>{letter.letterTitle}</h2>
                <TypingLetter paragraphs={letter.letterBody} />
                <footer className={styles.footer}>
                  <p>{letter.closingMessage}</p>
                  <p className={styles.signature}>{letter.signature}</p>
                </footer>
                {letter.gift ? (
                  <div className={styles.giftSection}>
                    <button
                      className={styles.giftButton}
                      type="button"
                      onClick={() => setIsGiftOpen(true)}
                    >
                      <span aria-hidden="true">✧</span>
                      Open Your Gift
                      <span aria-hidden="true">✧</span>
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
