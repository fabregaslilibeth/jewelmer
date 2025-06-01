export const perspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 20,
    translateX: -5,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 * i,
      ease: [0.76, 0, 0.24, 1]
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
  }
}

export const mobilePerspective = {
  initial: {
    opacity: 0,
    rotateX: 90,
    translateY: 20,
    translateX: -5,
  },
  enter: (i: number) => ({
    opacity: 1,
    rotateX: 0,
    translateY: 0,
    translateX: 0,
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] }
  }
} 