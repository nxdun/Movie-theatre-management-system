const express = require("express");
const bodyParser = require("body-parser");

const DUMMY_DATA = [
    {
        id: "d1",
        title: "First Meetup",
        address: "SeoulA",
        description: "This is a first meetup"
    },
    {
        id: "d2",
        title: "Second Meetup",
        address: "SeoulB",
        description: "This is a second meetup"
    },
    {
        id: "d3",
        title: "Third Meetup",
        address: "SeoulC",
        description: "This is a third meetup"
    },
    {
        id: "d4",
        title: "Fourth Meetup",
        address: "Seould",
        description: "This is a fourth meetup"
    },
]
const router = express.Router();
router.get("/:pid", (req, res) => {
  const take = req.params.pid;
  console.log(take);
  const d = DUMMY_DATA.find((item) => {
   return item.id === take;
   
  });
  res.json({ data: d });
});

module.exports = router;
