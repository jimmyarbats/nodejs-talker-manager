const generateToken = () => {
    const validCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array(16).fill()
      .reduce((token) => {
        token.push(validCharacters[Math.floor(Math.random() * validCharacters.length)]);
        return token;
      }, []).join('');
  };
  
module.exports = generateToken;
