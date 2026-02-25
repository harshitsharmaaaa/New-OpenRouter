import DashboardLayout from "@/components/ui/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useElysiaClient } from "@/providers/Eden";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Coins, Loader2, PlusCircle } from "lucide-react";

export function CreditsPage() {
  const elysiaClient = useElysiaClient();
  const queryClient = useQueryClient();

  const creditsQuery = useQuery({
    queryKey: ["credits"],
    queryFn: async () => {
      const response = await elysiaClient.payments.get();
      if (response.error) {
        const errValue = response.error.value as { message?: string } | undefined;
        throw new Error(errValue?.message || "Failed to load credits");
      }
      return response.data;
    },
  });

  const userProfileQuery = useQuery({
    queryKey:["user-Profile"],
    queryFn:async()=>{
      const response = await elysiaClient.auth.profile.get();
      if(response.error){
        const errValue = response.error.value as { message?: string } | undefined;
        throw new Error(errValue?.message || "Failed to load credits");
      }
      return response.data;
    }
  })

  const onrampMutation = useMutation({
    mutationFn: async () => {
      const response = await elysiaClient.payments["onramp"].post();
      if (response.error) {
        const errValue = response.error.value as { message?: string } | undefined;
        throw new Error(errValue?.message || "Onramp failed");
      }
      return response.data;
    },
    onSuccess: (data) => {
      // Update cached credits so UI reflects new balance immediately
      queryClient.setQueryData(["credits"], { credits: data.credits });
    },
  });

  const credits = userProfileQuery.data?.credits;

  const isLoading = onrampMutation.isPending || creditsQuery.isLoading;
  const currentCredits = creditsQuery.data?.credits ?? 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">Credits</h1>
          <p className="text-sm mt-1 text-zinc-400">
            Top up your balance to continue making requests through OpenRouter.
          </p>
        </div>

        <Card className="bg-zinc-950/70 border border-zinc-800/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg text-zinc-50">Current balance</CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Credits available for API usage.
              </CardDescription>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-500/10 border border-amber-400/40">
              <Coins className="size-5 text-amber-300" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-semibold tracking-tight text-zinc-50">
              {creditsQuery.isLoading ? "…" : currentCredits.toLocaleString()}
              <span className="ml-2 text-sm font-normal text-zinc-400">credits</span>
            </div>

            {creditsQuery.isError && (
              <div className="text-xs text-red-400">
                {(creditsQuery.error as Error).message}
              </div>
            )}

            {onrampMutation.isError && (
              <div className="text-xs text-red-400">
                {(onrampMutation.error as Error).message}
              </div>
            )}

            <Button
              className="inline-flex items-center gap-2 bg-zinc-100 hover:bg:white text-zinc-950 font-medium shadow-md shadow-black/30 hover:shadow-lg hover:shadow-black/40"
              disabled={isLoading}
              onClick={() => onrampMutation.mutate()}
            >
              {onrampMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Adding credits…
                </>
              ) : (
                <>
                  <PlusCircle className="size-4" />
                  Add 1,000 credits
                </>
              )}
            </Button>

            <p className="text-[0.7rem] text-zinc-500">
              This simulates an onramp transaction in your backend. In a real integration, you would
              connect this action to your payment provider (Stripe, Paddle, etc.).
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}