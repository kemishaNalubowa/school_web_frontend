// In your SignInPage.js handleSubmit function:

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    // 🔐 Replace with your actual authentication API call
    // const response = await authService.login({ email, password });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create user object (replace with actual user data from API)
    const userData = {
      id: Date.now(),
      name: formData.name || email.split('@')[0],
      email: email,
      role: 'student', // or 'parent', 'teacher', 'admin'
      avatar: null
    };
    
    // ✅ Call the onLogin callback passed from App.js
    if (onLogin) {
      onLogin(userData);
    }
    
    // Show success toast
    toast.success('Welcome back! Sign in successful.');
    
    // Redirect to academics or previous location
    const from = location.state?.from?.pathname || '/academics';
    navigate(from, { replace: true });
    
  } catch (err) {
    console.error('Login error:', err);
    setError('Invalid email or password. Please try again.');
    toast.error('Sign in failed. Please check your credentials.');
  } finally {
    setLoading(false);
  }
};