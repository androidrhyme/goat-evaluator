"use client";

import React, { useState } from "react";
import { Slider } from "../components/ui/slider";
import { Circle } from "lucide-react";

const CRITERIA = [
  "Accolades",
  "Prime",
  "Peak",
  "Leaderboards",
  "Two-Way",
  "Playoff Rise",
  "Regular Season Winning",
  "Postseason Winning",
  "Versatility",
  "Cultural Impact",
  "Artistry"
];

const SLIDER_PROPS = {
  max: 100,
  step: 1,
  thumbClassName: "w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center",
  renderThumb: () => <Circle size={16} className="text-white" />
};

export default function GOATModel() {
  const [weights, setWeights] = useState(CRITERIA.map(() => 0));
  const [eraWeight, setEraWeight] = useState(1.0);
  const [rsPsSplit, setRsPsSplit] = useState(50);
  const [tradAdvSplit, setTradAdvSplit] = useState(50);

  const handleSliderChange = (changedIndex: number, newValue: number) => {
    const newWeights = [...weights];
    const totalWithoutCurrent = newWeights.reduce((sum, val, i) => i === changedIndex ? sum : sum + val, 0);

    if (totalWithoutCurrent + newValue <= 100) {
      newWeights[changedIndex] = newValue;
      setWeights(newWeights);
    }
  };

  const descriptions: Record<string, string> = {
    "Prime": "Player performance in all the years he was at an elite level (example: Kobe Bryant 2001-2013)",
    "Peak": "Player performance in the 2-3 consecutive seasons where he was at his best (example: Kobe Bryant 2007-2009)",
    "Leaderboards": "Placement in career box score stat totals like points, rebounds, and assists",
    "Two-Way": "Balance of elite-level offense and elite-level defense",
    "Playoff Rise": "The ability to <i>increase</i> performance from the regular season into the postseason",
    "Regular Season Winning": "Team success during the regular season through the player’s prime years",
    "Postseason Winning": "Team success in the postseason through the player’s career",
    "Versatility": "Ability to score in multiple ways, rebound, pass, and defend in multiple ways",
    "Cultural Impact": "Influence on the sport or public",
    "Artistry": "Play style that is exceptionally creative or aesthetically pleasing"
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Build Your Model for the GOAT NBA Player</h1>

      <section>
        <img src="/era-banner.png" alt="Era Banner" className="mb-4 w-full rounded-lg" />
        <h2 className="text-xl font-semibold">1. Choose Your Era</h2>
        <p>Is everyone in the conversation, or should older eras be viewed less favorably?</p>
        <Slider
          value={[eraWeight]}
          onValueChange={([v]) => setEraWeight(v)}
          min={1.0}
          max={7.0}
          step={0.1}
        />
        <div className="mt-2 mb-4 flex justify-between text-sm">
          <span>"Plumbers"</span>
          <span className="font-bold">Era: {eraWeight.toFixed(1)}</span>
          <span>"Ballers"</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">2. Evaluate Performance</h2>
        <p className="text-sm text-muted-foreground">
          This is purely a measure of a player’s production and ability to increase the chances of winning. A win or an MVP does not influence the evaluation of a player’s performance. We don’t have the luxury of the “eye test” in this statistical assessment, so choose which numbers you want to consider.
        </p>
        <p className="mt-6">Regular Season vs. Postseason</p>
        <Slider value={[rsPsSplit]} onValueChange={([v]) => setRsPsSplit(v)} {...SLIDER_PROPS} />
        <div className="mt-2 mb-4 flex justify-between text-sm">
          <span>Regular Season</span>
          <span className="font-semibold">{100 - rsPsSplit}% / {rsPsSplit}%</span>
          <span>Postseason</span>
        </div>

        <p className="mt-6">Traditional Box Score vs. Advanced Statistics</p>
        <Slider value={[tradAdvSplit]} onValueChange={([v]) => setTradAdvSplit(v)} {...SLIDER_PROPS} />
        <div className="mt-2 mb-4 flex justify-between text-sm">
          <span>Traditional</span>
          <span className="font-semibold">{100 - tradAdvSplit}% / {tradAdvSplit}%</span>
          <span>Advanced</span>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">3. Build Your Model</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Distribute 100 points across the following criteria:
        </p>
        <div className="space-y-6">
          {CRITERIA.map((label, i) => (
            <div key={i}>
              <h3 className="text-base font-semibold">{label}: {weights[i]}</h3>
              {label === "Accolades" && (
                <p className="text-sm text-muted-foreground mb-1">
                  Personal awards (MVPs, FMVPs, All-NBA, Scoring Titles, etc.)
                </p>
              )}
              {descriptions[label] && label !== "Accolades" && (
                <p className="text-sm text-muted-foreground mb-1" dangerouslySetInnerHTML={{ __html: descriptions[label] }} />
              )}
              <Slider
                value={[weights[i]]}
                onValueChange={([v]) => handleSliderChange(i, v)}
                {...SLIDER_PROPS}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
