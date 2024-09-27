const Replicate = require('replicate');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const virtualTryOn = async (req, res) => {
  try {
    const { garmImg, maskImg, humanImg, garmentDes } = req.body;
    
    const output = await replicate.run(
      "cuuupid/idm-vton:c871bb9b046607b680449ecbae55fd8c6d945e0a1948644bf2361b3d021d3ff4",
      {
        input: {
          crop: false,
          seed: 42,
          steps: 30,
          category: "upper_body",
          force_dc: false,
          garm_img: garmImg,
          mask_img: maskImg,
          human_img: humanImg,
          garment_des: garmentDes
        }
      }
    );
    
    res.json({ result: output });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};

module.exports = {
  virtualTryOn
};