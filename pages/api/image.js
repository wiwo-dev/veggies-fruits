import nextConnect from "next-connect";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });
// Returns middleware that processes file
const uploadMiddleware = upload.single("image");
//const uploadMiddlewareMultiple = upload.array("images[]", 10);

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(req.body);
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Adds the middleware to Next-Connect
apiRoute.use(uploadMiddleware);
//apiRoute.use(uploadMiddlewareMultiple);

apiRoute.post(async (req, res) => {
  //console.log(req.body);
  //console.log("FILESSSSS");
  const { name, category } = req.body;
  console.log(req.file);
  const dateString = `${new Date().toISOString()}`.replace(/[^a-zA-Z0-9]/g, "").split("T")[0]; //?
  const timeString = new Date().toLocaleTimeString("pl").replace(/[A-Z:]/g, "");
  const dateTimeString = `${dateString}T${timeString}`;

  const imgixResponse = await saveImage(req.file.buffer, `${category}/${name}-${dateTimeString}`);
  //console.log(imgixResponse);
  //res.status(200).json({ data: imgixResponse });
  res.status(200).json({ data: imgixResponse.data });
});

export default apiRoute;

const saveImage = async (file, filename) => {
  try {
    const response = await fetch(`${process.env.IMGIX_API_URL}/upload/${filename}.jpg`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.IMGIX_API_KEY}`,
      },
      body: file,
    });

    const result = await response.json();
    //console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return error;
  }
};
