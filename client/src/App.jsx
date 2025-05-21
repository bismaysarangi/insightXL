import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
      <Badge className="bg-blue-500 text-white">Hello</Badge>
    </div>
  );
}

export default App;
