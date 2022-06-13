

export default async function handle(req, res) {
    console.log("HELLO!")
  
    res.json({message: "working"});

    setTimeout(() => {
        res.json({message: "done"});
    },1000)

   
}
