// client/src/pages/Home.tsx
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Group as GroupIcon,
  Event as EventIcon,
  Chat as ChatIcon,
  DateRange as DateRangeIcon,
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                fontWeight="bold"
                gutterBottom
              >
                Adelaide Student Resource Hub
              </Typography>
              <Typography variant="h5" paragraph>
                Connect with fellow students, share resources, and form study groups to excel in your academic journey.
              </Typography>
              <Box mt={4}>
                {!isAuthenticated ? (
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to="/register"
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          '&:hover': { bgcolor: 'grey.100' },
                        }}
                      >
                        Join Now
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to="/login"
                        variant="outlined"
                        size="large"
                        sx={{ color: 'white', borderColor: 'white' }}
                      >
                        Sign In
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to="/dashboard"
                        variant="contained"
                        color="secondary"
                        size="large"
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          '&:hover': { bgcolor: 'grey.100' },
                        }}
                      >
                        Go to Dashboard
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        component={RouterLink}
                        to="/resources"
                        variant="outlined"
                        size="large"
                        sx={{ color: 'white', borderColor: 'white' }}
                      >
                        Browse Resources
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Box
                component="img"
                src="/campus-illustration.svg"
                alt="University of Adelaide campus"
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'contain',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            component="h2"
            variant="h3"
            color="text.primary"
            gutterBottom
          >
            Features
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Everything you need to enhance your learning experience at the University of Adelaide
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'rgba(212, 46, 18, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MenuBookIcon
                  sx={{ fontSize: 80, color: 'primary.main', mt: -15 }}
                />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  Resource Repository
                </Typography>
                <Typography color="text.secondary">
                  Form and join study groups for specific courses. Coordinate meeting times, share group-specific resources, and collaborate with peers who share your academic goals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'rgba(212, 46, 18, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChatIcon
                  sx={{ fontSize: 80, color: 'primary.main', mt: -15 }}
                />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  Real-time Communication
                </Typography>
                <Typography color="text.secondary">
                  Chat with your study group members, ask questions, and share insights. Stay connected with your academic community anytime, anywhere.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              component="h2"
              variant="h3"
              color="text.primary"
              gutterBottom
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              Getting started is easy
            </Typography>
          </Box>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Create an Account"
                      secondary="Sign up using your University of Adelaide email to get access to all features."
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <MenuBookIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Browse Resources"
                      secondary="Search for study materials by course, topic, or format. Download what you need or upload your own to help others."
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <GroupIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Join Study Groups"
                      secondary="Find groups for your courses or create your own. Invite classmates to collaborate together."
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemIcon>
                      <DateRangeIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Schedule Sessions"
                      secondary="Plan study sessions, set meeting locations or links, and track your group's progress."
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: { xs: 'none', md: 'block' } }}
            >
              <Box
                component="img"
                src="/how-it-works.svg"
                alt="Students studying together"
                sx={{
                  width: '100%',
                  maxHeight: 400,
                  objectFit: 'contain',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            component="h2"
            variant="h3"
            color="text.primary"
            gutterBottom
          >
            Student Testimonials
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Hear from students who've improved their academic performance through our platform
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ fontStyle: 'italic' }}
                >
                  "The resource hub transformed my study routine. I found past exams that helped me understand the exam format and focus my preparation. My grades improved significantly!"
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    src="/avatar1.svg"
                    alt="Student avatar"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1">Sarah Johnson</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Computer Science, 3rd Year
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ fontStyle: 'italic' }}
                >
                  "I was struggling with advanced programming concepts until I joined a study group through this platform. The regular sessions and peer explanations made complex ideas much clearer."
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    src="/avatar2.svg"
                    alt="Student avatar"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1">David Chen</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Software Engineering, 2nd Year
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  paragraph
                  sx={{ fontStyle: 'italic' }}
                >
                  "As an international student, I found it challenging to connect with classmates at first. This platform made it so much easier to find study partners and access quality resources for my courses."
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box display="flex" alignItems="center">
                  <Box
                    component="img"
                    src="/avatar3.svg"
                    alt="Student avatar"
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      mr: 2,
                    }}
                  />
                  <Box>
                    <Typography variant="subtitle1">Maria Rodriguez</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Data Science, Masters
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom fontWeight="bold">
              Ready to Enhance Your Academic Journey?
            </Typography>
            <Typography variant="h6" paragraph sx={{ mb: 4 }}>
              Join Adelaide Student Resource Hub today and connect with a community dedicated to academic excellence.
            </Typography>
            {!isAuthenticated ? (
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' },
                  px: 4,
                  py: 1.5,
                }}
              >
                Join Now
              </Button>
            ) : (
              <Button
                component={RouterLink}
                to="/dashboard"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' },
                  px: 4,
                  py: 1.5,
                }}
              >
                Go to Dashboard
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;="text.secondary">
                  Access and share course materials, lecture notes, practice exams, and study guides. Organize resources by course and topic for easy retrieval.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'rgba(212, 46, 18, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GroupIcon
                  sx={{ fontSize: 80, color: 'primary.main', mt: -15 }}
                />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  Study Groups
                </Typography>
                <Typography color