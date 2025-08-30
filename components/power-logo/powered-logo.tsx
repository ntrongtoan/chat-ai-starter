import { Button } from "../ui/button";

export function PoweredLogo() {
  return (
    <div className="text-center w-full p-1">
      <a
        href="https://toannguyentrong.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          className="flex items-center gap-1 text-xs text-gray-500 text-center mx-auto"
          variant="ghost"
          size="sm"
        >
          <span>Powered by Chat Toolkit</span>
        </Button>
      </a>
    </div>
  );
}
