exports.fishingIndustryProcessing = function(data) {
  let result = 0;

  if (data) {
    const peopleFishing = data['1014'] || 0;
    const peopleTotal = data['1012'] || Infinity;

    const percentage = (peopleFishing / peopleTotal) * 100;
    const percentageRounded = (Math.round(percentage * 1000) / 1000);

    result = `${percentageRounded}%`;
  }

  return result;
}
