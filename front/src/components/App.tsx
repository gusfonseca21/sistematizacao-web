import Card from './Card';
import Logo from './Logo';

function App() {
  return (
    <div className="flex min-h-screen min-w-fit flex-col items-center justify-center gap-12 bg-custom-background">
      <Logo />
      <Card />
    </div>
  );
}

export default App;
