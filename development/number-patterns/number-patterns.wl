(* Evaluate the whole expression in a Mathematica notebook. *)
DynamicModule[
 {board = "Multiplication", n = 10, first = 1, x = 4, m = 4,
  mode = "Multiples", marked = {}, message = ""},
 Column[{
   Row[{"Board: ", PopupMenu[
      Dynamic[board, (board = #; marked = {}; message = "") &],
      {"Multiplication", "Number square"}], Spacer[15],
     "Width: ", SetterBar[
      Dynamic[n, (n = #; marked = {}; message = "") &],
      {5, 8, 10, 12, 15, 20}]}],
   Row[{"Start of number square: ",
     PopupMenu[Dynamic[first, (first = #; marked = {}) &],
      {0, 1, 101}], Spacer[15], "Selected number: ", Dynamic[x]}],
   Row[{"Pattern: ", PopupMenu[
      Dynamic[mode, (mode = #; marked = {}; message = "") &],
      {"Multiples", "Factors", "Remainders", "Squares", "Cubes",
       "Primes", "Mark freely", "Find squares", "Find cubes",
       "Find primes"}]}],
   Row[{"Remainder divisor: ", Slider[Dynamic[m], {2, 12, 1}],
     Spacer[10], Dynamic[m], Spacer[15],
     Button["Clear marks", marked = {}; message = ""]}],
   Style["Tap a number for its multiples/factors. In Find modes, mark every matching cell.", 13],
   Dynamic[
    With[{values = If[board === "Multiplication",
        Table[r c, {r, n}, {c, n}],
        Partition[Range[first, first + n^2 - 1], n]]},
     Grid[
      Table[
       With[{v = values[[r, c]], pos = {r, c}},
        Button[
         Tooltip[Style[v, If[n > 12, 12, 16]],
          If[board === "Multiplication",
           Row[{r, " × ", c, " = ", v}], v]],
         If[MemberQ[{"Mark freely", "Find squares", "Find cubes",
             "Find primes"}, mode],
          marked = If[MemberQ[marked, pos], DeleteCases[marked, pos],
            Append[marked, pos]]; message = "",
          If[v > 0, x = v]],
         Background -> Which[
           mode === "Remainders", Hue[Mod[v, m]/m, .4, 1],
           mode === "Multiples" && Mod[v, x] === 0, LightBlue,
           mode === "Factors" && v > 0 && Mod[x, v] === 0, LightBlue,
           mode === "Squares" && IntegerQ[Sqrt[v]], LightBlue,
           mode === "Cubes" && IntegerQ[Surd[v, 3]], LightBlue,
           mode === "Primes" && PrimeQ[v], LightBlue,
           MemberQ[marked, pos], LightBlue,
           True, White],
         ImageSize -> {If[n > 12, 32, 42], If[n > 12, 32, 42]},
         Appearance -> "Frameless"]],
       {r, n}, {c, n}], Frame -> All, Spacings -> {.15, .15}]],
    TrackedSymbols :> {board, n, first, x, m, mode, marked}],
   Dynamic[If[mode === "Remainders",
     Row[Table[Style[Row[{" r", r, " "}],
        Background -> Hue[r/m, .4, 1]], {r, 0, m - 1}]], ""]],
   Button["Check discoveries",
    If[! MemberQ[{"Find squares", "Find cubes", "Find primes"}, mode],
     message = "Choose a Find mode first.",
     Module[{values, test, wanted, good, wrong, missing},
      values = If[board === "Multiplication",
        Table[r c, {r, n}, {c, n}],
        Partition[Range[first, first + n^2 - 1], n]];
      test = Switch[mode,
        "Find squares", (IntegerQ[Sqrt[#]] &),
        "Find cubes", (IntegerQ[Surd[#, 3]] &),
        "Find primes", PrimeQ];
      wanted = Select[Tuples[Range[n], 2], test[Extract[values, #]] &];
      good = Length[Intersection[marked, wanted]];
      wrong = Length[Complement[marked, wanted]];
      missing = Length[Complement[wanted, marked]];
      message = Row[{good, " correct; ", wrong,
         " to reconsider; ", missing, " still to find."}]]],
   Dynamic[message]
 }, Spacings -> 1.2]
]
