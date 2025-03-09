// client/src/pages/Dashboard.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Card,
  CardContent,
  CardActions,
  Tab,
  Tabs,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Description as DescriptionIcon,
  Group as GroupIcon,
  Event as EventIcon,
  Add as AddIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

// Define interfaces for data types
interface Resource {
  _id: string;
  title: string;
  description: string;
  type: string;
  course: {
    _id: string;
    name: string;
    code: string;
  };
  createdAt: string;
  totalDownloads: number;
}

interface StudyGroup {
  _id: string;
  name: string;
  description: string;
  course: {
    _id: string;
    name: string;
    code: string;
  };
  members: Array<{
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      profileImage: string;
    };
    role: string;
  }>;
  sessions: Array<{
    _id: string;
    title: string;
    startTime: string;
    endTime: string;
    location: string;
  }>;
}

interface Session {
  _id: string;
  title: string;
  startTime: string;
  endTime: string;
  location: string;
  studyGroup: {
    _id: string;
    name: string;
  };
}

const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState(0);
  
  // State for resources, study groups, and upcoming sessions
  const [resources, setResources] = useState<Resource[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  
  // Loading and error states
  const [loading, setLoading] = useState({
    resources: true,
    studyGroups: true,
    sessions: true,
  });
  const [error, setError] = useState({
    resources: '',
    studyGroups: '',
    sessions: '',
  });

  // Fetch user's resources
  useEffect(() => {
    const fetchUserResources = async () => {
      try {
        const res = await api.get('/api/v1/resources/user');
        setResources(res.data.data);
        setLoading(prev => ({ ...prev, resources: false }));
      } catch (err: any) {
        setError(prev => ({ 
          ...prev, 
          resources: err.response?.data?.error || 'Error fetching resources' 
        }));
        setLoading(prev => ({ ...prev, resources: false }));
      }
    };
    
    fetchUserResources();
  }, []);

  // Fetch user's study groups
  useEffect(() => {
    const fetchUserStudyGroups = async () => {
      try {
        const res = await api.get('/api/v1/studygroups/user');
        setStudyGroups(res.data.data);
        setLoading(prev => ({ ...prev, studyGroups: false }));
      } catch (err: any) {
        setError(prev => ({ 
          ...prev, 
          studyGroups: err.response?.data?.error || 'Error fetching study groups' 
        }));
        setLoading(prev => ({ ...prev, studyGroups: false }));
      }
    };
    
    fetchUserStudyGroups();
  }, []);

  // Fetch upcoming sessions
  useEffect(() => {
    const fetchUpcomingSessions = async () => {
      try {
        const res = await api.get('/api/v1/studygroups/sessions/upcoming');
        setUpcomingSessions(res.data.data);
        setLoading(prev => ({ ...prev, sessions: false }));
      } catch (err: any) {
        setError(prev => ({ 
          ...prev, 
          sessions: err.response?.data?.error || 'Error fetching sessions' 
        }));
        setLoading(prev => ({ ...prev, sessions: false }));
      }
    };
    
    fetchUpcomingSessions();
  }, []);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          mb: 4,
          backgroundImage: 'linear-gradient(to right, #d42e12, #e74c3c)',
          color: 'white',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" gutterBottom>
              Welcome back, {user?.firstName}!
            </Typography>
            <Typography variant="body1">
              Track your resources, study groups, and upcoming sessions all in one place.
            </Typography>
          </Box>
          <Avatar
            sx={{ width: 80, height: 80, bgcolor: 'white' }}
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.profileImage}
          >
            {user?.firstName?.charAt(0)}
          </Avatar>
        </Box>
      </Paper>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Button
            component={RouterLink}
            to="/resources/create"
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            sx={{ height: '100%', p: 2 }}
          >
            Upload Resource
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            component={RouterLink}
            to="/study-groups/create"
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            sx={{ height: '100%', p: 2 }}
          >
            Create Study Group
          </Button>
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            component={RouterLink}
            to="/profile"
            variant="contained"
            color="secondary"
            startIcon={<SchoolIcon />}
            fullWidth
            sx={{ height: '100%', p: 2 }}
          >
            View Profile
          </Button>
        </Grid>
      </Grid>

      {/* Content Tabs */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<DescriptionIcon />} label="My Resources" />
          <Tab icon={<GroupIcon />} label="My Study Groups" />
          <Tab icon={<EventIcon />} label="Upcoming Sessions" />
        </Tabs>
      </Box>

      {/* Resources Tab */}
      <Box hidden={tabValue !== 0}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">My Resources</Typography>
          <Button
            component={RouterLink}
            to="/resources"
            color="primary"
          >
            View All Resources
          </Button>
        </Box>
        
        {loading.resources ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : error.resources ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.resources}
          </Alert>
        ) : resources.length === 0 ? (
          <Box textAlign="center" my={4}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              You haven't uploaded any resources yet.
            </Typography>
            <Button
              component={RouterLink}
              to="/resources/create"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
            >
              Upload Resource
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {resources.map((resource) => (
              <Grid item xs={12} sm={6} md={4} key={resource._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div" noWrap>
                      {resource.title}
                    </Typography>
                    <Chip 
                      size="small" 
                      label={resource.type} 
                      color="primary" 
                      sx={{ mt: 1, mb: 1 }} 
                    />
                    <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
                      {resource.description}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Course: {resource.course.code}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Uploaded: {formatDate(resource.createdAt)}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      Downloads: {resource.totalDownloads}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={RouterLink} 
                      to={`/resources/${resource._id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}