<recipetype:create:filling>.addRecipe("jaffa_final", <item:jaffactory:jaffa_cake>, <item:jaffactory:jaffa_slime_base>, <fluid:create:chocolate> * 250);

<recipetype:create:mixing>.addRecipe("cake_base", <constant:create:heat_condition:heated>, [<item:jaffactory:jaffa_base>], [<item:create:dough>, <item:minecraft:sugar>, <item:minecraft:egg>], [<fluid:minecraft:milk> * 1000]);

<recipetype:create:deploying>.addRecipe("jaffa_slime", <item:jaffactory:jaffa_base>, <item:jaffactory:jaffa_slime>, [<item:jaffactory:jaffa_slime_base>]);

<recipetype:create:mixing>.addRecipe("jaffa_biomass", <constant:create:heat_condition:heated>, [<item:createaddition:biomass>], [<item:jaffactory:orange_sapling>], [<fluid:createaddition:seed_oil> * 100]);