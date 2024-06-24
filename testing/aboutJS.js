//List of whitelisted urls for redirects
const whitelist = ['main.html', 'about.html', 'contact.html'];


//----------------------------------------redirect validation---------------------------------------------------------------------------------------------
function redirectTo(url) {
  if (whitelist.includes(url)) {
    window.location.href = url;
  } else {
    console.error('Invalid redirect URL:', url);
    alert('Invalid URL');
  }
}