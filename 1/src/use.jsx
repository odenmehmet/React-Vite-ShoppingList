useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    console.log('Stored Notes:', storedNotes);
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);
  
  useEffect(() => {
    console.log('Notes:', notes);
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  