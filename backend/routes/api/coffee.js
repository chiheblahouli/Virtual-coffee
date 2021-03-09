const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Coffee = require("../../models/Coffee");
const { check, validationResult } = require("express-validator");

/*  @route GET api/business/me
    @route get current user business
    @access Public
    TO DO
    */
// router.get("/me", auth, async (req, res) => {
//   try {
//     const business = await Business.findOne({
//       owner: req.user.id,
//     }).populate("owner", ["name"]);
//     if (!business) {
//       return res
//         .status(400)
//         .json({ msg: "There is no Business for this user" });
//     }
//     const allWalkinTickets = business.queue.ticket.filter(
//       (t) => t.source === "WALK_IN"
//     );
//     const qArray = business.queue.ticket.slice(
//       business.queue.currentNumber,
//       business.queue.ticket.length
//     );
//     const WiArray = qArray.filter((t) => t.source === "WALK_IN");

//     const info = {
//       id: business.id,
//       ticket: business.queue.ticket,
//       name: business.name,
//       currentNumber: business.queue.currentNumber,
//       bstate: business.state,
//       qstate: business.queue.state,
//       wLength: allWalkinTickets.length,
//       maxLength: business.queue.maxLength,
//       qLength: qArray.length,
//       wiQLength: WiArray.length,
//       estimatedTime: business.queue.timePerTicket * qArray.length,
//       img: business.img,
//     };
//     res.json(info);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send("Server Error");
//   }
// });

/*  @route POST api/coffee/
    @route Create user coffee
    @access PRIVATE
    TO DO
    */
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("tables", "category is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //if errors then show errors message
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, tables } = req.body;

    try {
      let coffee = await Coffee.findOne({ owner: req.user.id });
      if (coffee) {
        return res
          .status(400)
          .json({ errors: [{ msg: "this user already have a coffee" }] });
      }
      coffee = {};
      coffee.owner = req.user.id;
      coffee.name = name;
      coffee.tables = tables;

      const coffeee = new Coffee(coffee);
      await coffeee.save();
      res.json("coffee added");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   Get api/coffee/all
// @desc    get all coffees
// @access  public

router.get("/all", async (req, res) => {
  try {
    const coffees = await Coffee.find().populate("owner", ["name"]);
    if (!coffees) return res.status(400).json({ msg: "There is no coffee" });

    res.json(coffees);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "There is no coffee" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   Get api/coffee/fetch/:coffeeid
// @desc    get coffee informations by  id
// @access  Public
router.get("/fetch/:coffeeid", async (req, res) => {
  try {
    // See if business exists
    const id = req.params.coffeeid;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        errors: [
          {
            msg: "Coffee does not exist",
          },
        ],
      });
    }

    let coffee = await Coffee.findById(id).populate("owner", ["name"]);
    if (!coffee) {
      return res.status(400).json({
        errors: [
          {
            msg: "Coffee does not exist",
          },
        ],
      });
    }

    return res.json(coffee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/coffee/update/:coffeeid
// @desc    UPDATE coffee
// @access  user
router.put("/update/:coffeeid", auth, async (req, res) => {
  try {
    let { name, tables } = req.body;

    const id = req.params.coffeeid;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        errors: [
          {
            msg: "Coffee does not exist",
          },
        ],
      });
    }

    let coffee = await Coffee.findById(id).populate("owner", ["name"]);
    if (!coffee) {
      return res.status(400).json({
        errors: [
          {
            msg: "Coffee does not exist",
          },
        ],
      });
    }
    //business = {};
    if (name) {
      coffee.name = name;
    }
    if (tables) coffee.tables = tables;

    coffee = await Coffee.findByIdAndUpdate(
      id,
      {
        $set: coffee,
      },
      {
        new: true,
      }
    );
    return res.json({ msg: "Coffee updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/coffee/add-user/:id/:name
// @desc    generate new ticket
// @access  user
router.post("/add-or-remove-user/:id/:name", auth, async (req, res) => {
  const { type } = req.body;
  try {
    // See if coffee exists
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        errors: [
          {
            msg: "Coffee does not exist",
          },
        ],
      });
    }

    // See if table exists
    // if (!req.params.name.match(/^[0-9a-fA-F]{24}$/)) {
    //   return res.status(400).json({
    //     errors: [
    //       {
    //         msg: "Coffee does not exist",
    //       },
    //     ],
    //   });
    // }

    let coffee = await Coffee.findById(req.params.id);
    if (!coffee) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Coffee does not exists" }] });
    }
    tables = coffee.tables;

    let tt = tables.find((o, i) => {
      if (o.name === req.params.name) {
        if (type === "add") {
          tables[i] = {
            name: o.name,
            limitNumber: o.limitNumber,
            users: [...o.users, req.user.id],
          };
        } else {
          var index = o.users.indexOf(req.user.id);
          if (index > -1) {
            o.users.splice(index, 1);
            tables[i] = {
              name: o.name,
              limitNumber: o.limitNumber,
              users: [...o.users],
            };
          }
        }
        return true; // stop searching
      }
    });
    coffee.tables = tables;
    coffee = await Coffee.findByIdAndUpdate(
      req.params.id,
      {
        $set: coffee,
      },
      {
        new: true,
      }
    );
    return res.json("user added/removed to/from table");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/business/delete/:id
// @desc    DELETE business
// @access  only user
// router.delete("/delete/:id", auth, async (req, res) => {
//   try {
//     // See if business id is valid
//     const id = req.params.id;
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(400).json({
//         errors: [
//           {
//             msg: "business does not exist",
//           },
//         ],
//       });
//     }
//     // See if business exists
//     let business = await Business.findById(id).select("name");
//     if (!business) {
//       return res.status(400).json({
//         errors: [
//           {
//             msg: "Business does not exist",
//           },
//         ],
//       });
//     }

//     // remove mission
//     await business.findOneAndRemove({ _id: id });
//     res.json({ msg: "business deleted" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });
module.exports = router;
