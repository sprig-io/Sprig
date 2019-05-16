import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Footer from "./Footer";

const styles = {
  card: {
    maxWidth: 245,
    display: "block"
  },
  media: {
    height: 280,
    margin: 3
  },
  bold: {
    fontWeight: "bold"
  },
  header: {}
};

function About(props) {
  const { classes } = props;
  return (
    <div>
      <div className="about-container">
        <h1 className="team">The Team</h1>
        <div className="about">
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/char.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Charlyn Manuyag
              </Typography>
              <Typography component="p">
                My name is Charlyn Manuyag! I am from the Bay Area, studied
                Engineering Physics at UC Berkeley and decided I want to become
                a Software Engineer.
              </Typography>
              <br />
              <br />
              <Typography className={classes.bold}>
                Favorite array method:
              </Typography>
              <Typography>filter()</Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                color="primary"
                href="https://github.com/charlynmanuyag"
                target="_blank"
              >
                Github
              </Button>
              <Button
                size="small"
                color="primary"
                href="https://www.linkedin.com/in/cmanuyag/"
                target="_blank"
              >
                LinkedIn
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/ramya.jpg"
              height="80px"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Ramya Sampath
              </Typography>
              <Typography component="p">
                Hi, I am Ramya Sampath, a simple human with deep passion and
                zeal to create new things that are helpful to others and also
                satisfies the engineer inside me.
              </Typography>
              <br />
              <br />
              <Typography className={classes.bold}>
                Favorite array method:
              </Typography>
              <Typography>
                filter() - because it gives us what we ask for. We can use
                filter in life to remove all worries and negativity.
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                color="primary"
                href="https://github.com/rsampath19"
                target="_blank"
              >
                Github
              </Button>
              <Button
                size="small"
                color="primary"
                href="https://www.linkedin.com/in/ramya-sampath-2a624517a/"
                target="_blank"
              >
                LinkedIn
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/lucy.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lucy Marshall
              </Typography>
              <Typography component="p">
                I am a full stack software engineer with a background in
                communications and diplomacy in Latin America. Prior to moving
                to NYC I lived in Cuba and Peru working for the UN and various
                development projects.
              </Typography>
              <br />
              <br />
              <Typography className={classes.bold}>
                Favorite array method:
              </Typography>
              <Typography>map()</Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                color="primary"
                href="https://github.com/lucymar"
                target="_blank"
              >
                Github
              </Button>
              <Button
                size="small"
                color="primary"
                href="https://www.linkedin.com/in/lucy-marshall1/"
                target="_blank"
              >
                LinkedIn
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="/katie.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Katie Agresta
              </Typography>
              <Typography component="p">
                After exploring the business side of tech for 3 years at
                American Express, I wanted to move on from the client side of
                product management to actually developing products myself. I’m
                now a full-stack specializing in the MERN and NERDS stacks.
              </Typography>
              <br />
              <br />
              <Typography className={classes.bold}>
                Favorite array method:
              </Typography>
              <Typography>reduce()</Typography>
            </CardContent>

            <CardActions>
              <Button
                size="small"
                color="primary"
                href="https://github.com/kagresta"
                target="_blank"
              >
                Github
              </Button>
              <Button
                size="small"
                color="primary"
                href="https://www.linkedin.com/in/katieagresta/"
                target="_blank"
              >
                LinkedIn
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
