const generateNumbers = () => {
    const numbers = new Set();
  
    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }
  
    return [...numbers].sort((a, b) => a - b);
  };
  
  const displayGeneratedNumbers = () => {
    const generatedNumbersDiv = document.getElementById("generatedNumbers");
    const numbers = generateNumbers();
    generatedNumbersDiv.innerHTML = "";
  
    for (const number of numbers) {
      const numberDiv = document.createElement("div");
      numberDiv.className = "generated-number";
      numberDiv.textContent = number;
      generatedNumbersDiv.appendChild(numberDiv);
    }
  };
  
  const generateBtn = document.getElementById("generate");
  generateBtn.addEventListener("click", displayGeneratedNumbers);
  
  const getWinningNumbers = async () => {
    const roundInput = document.getElementById('roundInput');
    const resultDiv = document.getElementById('result');
    const round = parseInt(roundInput.value, 10);
    const response = await fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${round}`);
    const data = await response.json();
  
    if (data.returnValue === 'success') {
      const winningNumbers = [
        data.drwtNo1,
        data.drwtNo2,
        data.drwtNo3,
        data.drwtNo4,
        data.drwtNo5,
        data.drwtNo6,
      ];
      resultDiv.innerText = `로또 ${round}회차 당첨번호: ${winningNumbers.join(', ')}`;
    } else {
      resultDiv.innerText = '입력하신 회차의 정보를 가져올 수 없습니다.';
    }
  };
  
  const searchBtn = document.getElementById('searchBtn');
  searchBtn.addEventListener('click', getWinningNumbers);
  