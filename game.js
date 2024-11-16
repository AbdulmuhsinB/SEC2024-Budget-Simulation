const financialData = [
  {
    "Year": 2011,
    "Average Annual Income (CAD)": "76,679.88",
    "Inflation Rate (%)": 2.9,
    "Fixed Monthly Expenses (CAD)": 721,
    "Non-Essential Monthly Expenses (CAD)": 500,
    "Monthly Average Rent (CAD)": 1010
  },
  {
    "Year": 2012,
    "Average Annual Income (CAD)": "76,165.93",
    "Inflation Rate (%)": 1.5,
    "Fixed Monthly Expenses (CAD)": 748,
    "Non-Essential Monthly Expenses (CAD)": 520,
    "Monthly Average Rent (CAD)": 1030
  },
  {
    "Year": 2013,
    "Average Annual Income (CAD)": "76,000.88",
    "Inflation Rate (%)": 0.9,
    "Fixed Monthly Expenses (CAD)": 771,
    "Non-Essential Monthly Expenses (CAD)": 540,
    "Monthly Average Rent (CAD)": 1035
  },
  {
    "Year": 2014,
    "Average Annual Income (CAD)": "75,717.59",
    "Inflation Rate (%)": 2,
    "Fixed Monthly Expenses (CAD)": 793,
    "Non-Essential Monthly Expenses (CAD)": 560,
    "Monthly Average Rent (CAD)": 1071
  },
  {
    "Year": 2015,
    "Average Annual Income (CAD)": "78,247.69",
    "Inflation Rate (%)": 1.1,
    "Fixed Monthly Expenses (CAD)": 820,
    "Non-Essential Monthly Expenses (CAD)": 580,
    "Monthly Average Rent (CAD)": 1110
  },
  {
    "Year": 2016,
    "Average Annual Income (CAD)": "87,842.58",
    "Inflation Rate (%)": 1.4,
    "Fixed Monthly Expenses (CAD)": 850,
    "Non-Essential Monthly Expenses (CAD)": 600,
    "Monthly Average Rent (CAD)": 1137
  },
  {
    "Year": 2017,
    "Average Annual Income (CAD)": "86,485.52",
    "Inflation Rate (%)": 1.6,
    "Fixed Monthly Expenses (CAD)": 880,
    "Non-Essential Monthly Expenses (CAD)": 620,
    "Monthly Average Rent (CAD)": 1202
  },
  {
    "Year": 2018,
    "Average Annual Income (CAD)": "88,501.24",
    "Inflation Rate (%)": 2.3,
    "Fixed Monthly Expenses (CAD)": 918,
    "Non-Essential Monthly Expenses (CAD)": 640,
    "Monthly Average Rent (CAD)": 1296
  },
  {
    "Year": 2019,
    "Average Annual Income (CAD)": "87,979.71",
    "Inflation Rate (%)": 1.9,
    "Fixed Monthly Expenses (CAD)": 956,
    "Non-Essential Monthly Expenses (CAD)": 660,
    "Monthly Average Rent (CAD)": 1362
  },
  {
    "Year": 2020,
    "Average Annual Income (CAD)": "105,991.04",
    "Inflation Rate (%)": 0.7,
    "Fixed Monthly Expenses (CAD)": 990,
    "Non-Essential Monthly Expenses (CAD)": 680,
    "Monthly Average Rent (CAD)": 1374
  },
  {
    "Year": 2021,
    "Average Annual Income (CAD)": "104214.60",
    "Inflation Rate (%)": 3.4,
    "Fixed Monthly Expenses (CAD)": 1038,
    "Non-Essential Monthly Expenses (CAD)": 700,
    "Monthly Average Rent (CAD)": 1440
  },
  {
    "Year": 2022,
    "Average Annual Income (CAD)": "105621.18",
    "Inflation Rate (%)": 6.8,
    "Fixed Monthly Expenses (CAD)": 1106,
    "Non-Essential Monthly Expenses (CAD)": 720,
    "Monthly Average Rent (CAD)": 1708
  }
];

const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const moneyElement = document.getElementById('money');
const debtElement = document.getElementById('debt');
const happinessElement = document.getElementById('happiness');

let state = {
  money: 0, 
  debt: 0,
  happiness: 50,
};

function initializeGameData(year) {
  const yearData = financialData.find(data => data.Year === year);

  if (yearData) {
    state.money = parseFloat(yearData['Average Annual Income (CAD)'].replace(/,/g, ''));
  } else {
    console.error('Year not found in the data.');
  }
}

initializeGameData(2011);

function startGame() {
  updateStatus();
  showTextNode(1);
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;

  if (option.setState) {
    state.money += option.setState.money || 0;
    state.debt += option.setState.debt || 0;
    state.happiness += option.setState.happiness || 0;
  }

  updateStatus();

  if (state.money <= 0) {
    alert('You ran out of money! Game Over.');
    return startGame();
  } else if (state.happiness <= 0) {
    alert('Your happiness dropped to zero. Game Over.');
    return startGame();
  } else if (state.debt > parseFloat(financialData[0]['Average Annual Income (CAD)'].replace(/,/g, '')) * 12) {
    alert('Your debt is too high! Game Over.');
    return startGame();
  }

  if (nextTextNodeId <= 0) {
    return startGame();
  }
  showTextNode(nextTextNodeId);
}

function updateStatus() {
  moneyElement.innerText = `$${state.money}`;
  debtElement.innerText = `$${state.debt}`;
  happinessElement.innerText = state.happiness;
}

const textNodes = [
  {
    id: 1,
    text: 'You start your first full-time job. You receive your first paycheck. How will you allocate it?',
    options: [
      {
        text: 'Save 20%, pay bills, and budget the rest',
        setState: { debt: -200, happiness: 5 },
        nextText: 2,
      },
      {
        text: 'Spend most of it on a new gadget you wanted',
        setState: { debt: 500, happiness: 10 },
        nextText: 2,
      },
      {
        text: 'Pay off debts aggressively, cutting leisure expenses',
        setState: { debt: -300, happiness: -10 },
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: 'You are deciding where to live. What is your housing choice?',
    options: [
      {
        text: 'Rooming (shared housing)',
        setState: { debt: parseFloat(financialData[0]['Monthly Average Rent (CAD)']) * 12 },
        nextText: 3,
      },
      {
        text: 'Renting (standard rental)',
        setState: { debt: parseFloat(financialData[0]['Monthly Average Rent (CAD)']) * 12 / 2 },
        nextText: 3,
      },
      {
        text: 'Luxury Renting (high-end rental)',
        setState: { debt: parseFloat(financialData[0]['Monthly Average Rent (CAD)']) * 12 * 2 },
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: 'Your car breaks down, and repairs will cost $700. How do you handle it?',
    options: [
      {
        text: 'Use your emergency savings',
        setState: { debt: 700, happiness: 5 },
        nextText: 4,
      },
      {
        text: 'Take out a loan to cover the repairs',
        setState: { debt: 1500, happiness: -10 },
        nextText: 4,
      },
      {
        text: 'Fix it yourself with limited resources',
        setState: { debt: 100, happiness: -5 },
        nextText: 4,
      },
    ],
  },
  {
    id: 4,
    text: 'You decide to go out for dinner. How extravagant is it?',
    options: [
      {
        text: 'Fine Dining every meal',
        setState: { debt: 300*3*12, happiness: 15 },
        nextText: 5,
      },
      {
        text: 'Fast food',
        setState: { debt: 50*3*12, happiness: -5 },
        nextText: 5,
      },
      {
        text: 'PB and J and some Water',
        setState: { debt: 1*3*12, happiness: -10 },
        nextText: 5,
      },
    ],
  },
  {
    id: 5,
    text: 'How would you manage your monthly expenses?',
    options: [
      {
        text: 'Pay off all fixed expenses first, save the rest',
        setState: { debt: -1000, happiness: 0 },
        nextText: 6,
      },
      {
        text: 'Pay your fixed expenses, then go on vacation',
        setState: { debt: 1500, happiness: -5 },
        nextText: 6,
      },
      {
        text: 'Buy things you don’t need, but justify them later',
        setState: { debt: 2000, happiness: 10 },
        nextText: 6,
      },
    ],
  },
  {
    id: 6,
    text: 'You have the chance to go on a spontaneous vacation. Will you go?',
    options: [
      {
        text: 'Yes, vacation is important for mental health',
        setState: { debt: 5000, happiness: 5 },
        nextText: 7,
      },
      {
        text: 'No, I can’t afford it right now',
        setState: { debt: 0, happiness: -10},
        nextText: 7,
      },
      {
        text: 'Maybe later, I need to plan it',
        setState: { debt: 1000, happiness: -5 },
        nextText: 7,
      },
    ],
  },
  {
    id: 7,
    text: 'How much do you spend on entertainment?',
    options: [
      {
        text: 'Above average',
        setState: { debt: parseFloat(financialData[0]['Non-Essential Monthly Expenses (CAD)']) *2* 12, happiness: 5 },
        nextText: 8,
      },
      {
        text: 'Average',
        setState: { debt:parseFloat(financialData[0]['Non-Essential Monthly Expenses (CAD)']) * 12, happiness: 5 },
        nextText: 8,
      },
      {
        text: 'below average',
        setState: { debt:parseFloat(financialData[0]['Non-Essential Monthly Expenses (CAD)']) * 12/2, happiness: -15 },
        nextText: 8,
      },
    ],
  },
  {
    id: 8,
    text: function() {
      return `The game has ended. Here's your financial summary:\n` + 
             `Total Money Remaining: $${state.money - state.debt}\n` + 
             `Happiness: ${state.happiness}\n` +
             `What could you have done better?\n` + 
             getFinancialSummary(state);
    },
    options: [
      {
        text: 'Start a new game',
        nextText: -1,
      }
    ],
  }
];

function getFinancialSummary(state) {
  const financialSummary = {
    "Income": state.money,
    "Debt": state.debt,
    "Remaining Money": state.money - state.debt,
    "Happiness": state.happiness,
    "Spending Breakdown": {
      "Fixed Monthly Expenses": parseFloat(financialData[0]['Fixed Monthly Expenses (CAD)']) * 12,
      "Non-Essential Monthly Expenses": parseFloat(financialData[0]['Non-Essential Monthly Expenses (CAD)']) * 12,
      "Rent": parseFloat(financialData[0]['Monthly Average Rent (CAD)']) * 12 
    }
  };

  return financialSummary;
}

function downloadFinancialSummary() {
  const financialSummary = getFinancialSummary(state);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(financialSummary, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "financial_summary.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  document.body.removeChild(downloadAnchorNode);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = typeof textNode.text === 'function' ? textNode.text() : textNode.text;

  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });

  if (textNode.id === 8) {
    const downloadButton = document.createElement('button');
    downloadButton.innerText = 'Download Financial Summary';
    downloadButton.classList.add('btn');
    downloadButton.addEventListener('click', downloadFinancialSummary);
    optionButtonsElement.appendChild(downloadButton);
  }
}


startGame();
