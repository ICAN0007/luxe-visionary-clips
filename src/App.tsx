import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Models from "./pages/Models.tsx";
import ModelDetail from "./pages/ModelDetail.tsx";
import VideoPage from "./pages/VideoPage.tsx";
import NotFound from "./pages/NotFound.tsx";
...
          <Route path="/" element={<Index />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/models" element={<Models />} />
          <Route path="/model/:code" element={<ModelDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
