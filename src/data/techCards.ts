export const techIcons = [
  {
    id: 1,
    techName: 'React',
    imageUrl: './images/react.svg',
  },
  {
    id: 2,
    techName: 'Angular',
    imageUrl: './images/angular.svg',
  },
  {
    id: 3,
    techName: 'Vue',
    imageUrl: './images/vue.svg',
  },
  {
    id: 4,
    techName: 'JavaScript',
    imageUrl: './images/javascript.svg',
  },
  {
    id: 5,
    techName: 'TypeScript',
    imageUrl: './images/typescript.svg',
  },
  {
    id: 6,
    techName: 'Node.js',
    imageUrl: './images/nodejs.svg',
  },
  {
    id: 7,
    techName: 'Python',
    imageUrl: './images/python.svg',
  },
  {
    id: 8,
    techName: 'Java',
    imageUrl: './images/java.svg',
  },
  {
    id: 9,
    techName: 'C++',
    imageUrl: './images/cpp.svg',
  },
  {
    id: 10,
    techName: 'PHP',
    imageUrl: './images/php.svg',
  },
  {
    id: 11,
    techName: 'Swift',
    imageUrl: './images/swift.svg',
  },
  {
    id: 12,
    techName: 'Kotlin',
    imageUrl: './images/kotlin.svg',
  },
  {
    id: 13,
    techName: 'Go',
    imageUrl: './images/go.svg',
  },
  {
    id: 14,
    techName: 'Ruby',
    imageUrl: './images/ruby.svg',
  },
  {
    id: 15,
    techName: 'Rust',
    imageUrl: './images/rust.svg',
  },
  {
    id: 16,
    techName: 'Docker',
    imageUrl: './images/docker.svg',
  },
  {
    id: 17,
    techName: 'Kubernetes',
    imageUrl: './images/kubernetes.svg',
  },
  {
    id: 18,
    techName: 'AWS',
    imageUrl: './images/aws.svg',
  }
];

export const getLevelCards = (level: 'easy' | 'medium' | 'hard') => {
  let pairCount = 8; // Default for easy
  
  if (level === 'medium') {
    pairCount = 12;
  } else if (level === 'hard') {
    pairCount = 18;
  }
  
  // Get a subset of cards based on the level
  const selectedTechIcons = techIcons.slice(0, pairCount);
  
  // Create pairs of cards
  const cardPairs = selectedTechIcons.flatMap(icon => [
    {
      id: icon.id * 2 - 1,
      imageUrl: icon.imageUrl,
      isFlipped: false,
      isMatched: false,
      techName: icon.techName
    },
    {
      id: icon.id * 2,
      imageUrl: icon.imageUrl,
      isFlipped: false,
      isMatched: false,
      techName: icon.techName
    }
  ]);
  
  // Shuffle the cards
  return shuffleCards(cardPairs);
};

// Fisher-Yates shuffle algorithm
const shuffleCards = (cards: any[]) => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
