// client/src/pages/studyGroups/StudyGroups.tsx
import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
  Chip,
  Avatar,
  AvatarGroup,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { studyGroupApi } from '../../services/api';
import AuthContext from '../../context/AuthContext';

interface Course {
  _id: string;
  name: string;
  code: string;
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

interface StudyGroup {
  _id: string;
  name: string;
  description: string;
  course: Course;
  creator: User;
  members: Array<{
    user: User;
    role: string;
  }>;
  maxMembers: number;
  isPublic: boolean;
  createdAt: string;
  sessions: Array<{
    _id: string;
    title: string;
    startTime: string;
    endTime: string;
  }>;
}

const StudyGroups: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);

  // Fetch study groups
  useEffect(() => {
    const fetchStudyGroups = async () => {
      try {
        const res = await studyGroupApi.getStudyGroups();
        setStudyGroups(res.data.data);
        setFilteredGroups(res.data.data);
        
        // Extract unique courses for filter
        const uniqueCourses = Array.from(
          new Set(res.data.data.map((group: StudyGroup) => JSON.stringify(group.course)))
        ).map(course => JSON.parse(course));
        
        setCourses(uniqueCourses);
        setLoading(false);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error fetching study groups');
        setLoading(false);
      }
    };
    
    fetchStudyGroups();
  }, []);

  // Handle search and filter
  useEffect(() => {
    let result = studyGroups;
    
    // Apply search term filter
    if (searchTerm) {
      result = result.filter(
        group => 
          group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.course.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply course filter
    if (courseFilter) {
      result = result.filter(group => group.course._id === courseFilter);
    }
    
    setFilteredGroups(result);
  }, [searchTerm, courseFilter, studyGroups]);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get the next session if available
  const getNextSession = (sessions: any[]) => {
    if (!sessions || sessions.length === 0) return null;
    
    const now = new Date();
    const upcomingSessions = sessions
      .filter(session => new Date(session.startTime) > now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    
    return upcomingSessions.length > 0 ? upcomingSessions[0] : null;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Study Groups
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Find or create study groups for your courses. Collaborate with fellow students and improve together.
          </Typography>
        </Box>
        
        {isAuthenticated && (
          <Button
            component={RouterLink}
            to="/study-groups/create"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mt: { xs: 2, sm: 0 } }}
          >
            Create Study Group
          </Button>
        )}
      </Paper>

      {/* Search and Filters */}
      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name, description, or course"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <FilterListIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <FormControl fullWidth>
                <InputLabel>Filter by Course</InputLabel>
                <Select
                  value={courseFilter}
                  label="Filter by Course"
                  onChange={(e) => setCourseFilter(e.target.value as string)}
                >
                  <MenuItem value="">All Courses</MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course._id} value={course._id}>
                      {course.code}: {course.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Study Groups List */}
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : filteredGroups.length === 0 ? (
        <Box textAlign="center" my={4}>
          <GroupIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No study groups found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {searchTerm || courseFilter 
              ? "Try adjusting your search or filters" 
              : "There are no study groups available at the moment"}
          </Typography>
          {isAuthenticated && (
            <Button
              component={RouterLink}
              to="/study-groups/create"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Create the First Study Group
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredGroups.map((group) => {
            const nextSession = getNextSession(group.sessions);
            
            return (
              <Grid item xs={12} sm={6} md={4} key={group._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {group.name}
                    </Typography>
                    <Chip 
                      size="small" 
                      label={`${group.course.code}`} 
                      color="primary" 
                      sx={{ mb: 1 }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {group.description.length > 100 
                        ? `${group.description.substring(0, 100)}...` 
                        : group.description}
                    </Typography>
                    
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="caption" color="text.secondary">
                        Members: {group.members.length}/{group.maxMembers}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Created: {formatDate(group.createdAt)}
                      </Typography>
                    </Box>
                    
                    <AvatarGroup max={4} sx={{ justifyContent: 'flex-start', mb: 1 }}>
                      {group.members.map((member) => (
                        <Avatar 
                          key={member.user._id} 
                          alt={`${member.user.firstName} ${member.user.lastName}`}
                          src={member.user.profileImage}
                          sx={{ width: 30, height: 30 }}
                        >
                          {member.user.firstName[0]}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                    
                    {nextSession && (
                      <>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="caption" fontWeight="bold">
                          Next session:
                        </Typography>
                        <Typography variant="caption" display="block">
                          {nextSession.title} - {formatDate(nextSession.startTime)}
                        </Typography>
                      </>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={RouterLink} 
                      to={`/study-groups/${group._id}`}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default StudyGroups;