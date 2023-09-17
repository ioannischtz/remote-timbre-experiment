const randomizeArr = () => {
  const stimuli_order = new Array(72);
  for (let i = 0; i < stimuli_order.length; i += 1) {
    stimuli_order[i] = i;
  }

  for (let i = stimuli_order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [stimuli_order[i], stimuli_order[j]] = [stimuli_order[j], stimuli_order[i]];
  }

  return stimuli_order;
};

export default randomizeArr;
