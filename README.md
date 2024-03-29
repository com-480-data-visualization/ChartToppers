# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
|Nil Yagmur Ilba|374228|
|Kaede Johnson|357472|
|Davide Romano|354025|


[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (29th March, 5pm)

**10% of the final grade**

*(max. 2000 characters per section)*

### Dataset

We will use the European Social Survey (ESS) [data portal](https://ess.sikt.no/en/?tab=overview) to extract a timeseries view of European citizens’ views on politics, societal norms, and more, while stratifying by gender in particular. Our goal is to expand on work conducted by The Economist, The Financial Times, and other publications in exploring a recent trend of divergence in political and social opinion between the sexes.

The ESS is a biennial survey of randomly sampled citizens across 31 countries. It is meant to capture the sociopolitical opinions and conditions of private-household residents aged 15 and up in participating countries. The individual respondents are not stable year-to-year (it is not panel data, in other words), but rather sampled randomly and, for purposes of aggregation, assigned weights according to how representative they are of their country’s general population. 

A portion of the questions are asked during each round (or administration) of the survey. Other questions are temporary, collected from a pool of submissions sent by cross-cultural teams of European academics. We note that as survey data, our ‘ground truth’ is generated from participant response rather than more objective measurement. 

The ESS includes data at the level of the survey respondent and is generally well-maintained; for example, almost all features are encoded numerically thanks to survey questions that lend themselves to ordinal responses, and those numbers indicating a missing or refused response are clearly specified by robust data dictionaries. We therefore suspect data cleaning to be minimal. Pre-processing, meanwhile, will likely focus on (1) identifying and filtering to columns of interest and (2) grouping and aggregating by gender, age, and geography. The former can be handled via the ESS’ online portal while the latter is simple to code.

[Link](https://drive.switch.ch/index.php/s/zUVrlpnyXFoRs5b) to all variables in the dataset

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

Our inspiration stems from an Economist article entitled “Why young men and women are drifting apart”, which explores differences in (especially political) perspectives between young men and women. The analysis is backed by data from the European Social Survey (ESS). 

We will (1) emphasize The Economist’s analysis regarding education, gender, and political views, and (2) communicate age- or gender-based differences in other factors possibly manifesting ideological divides. These ‘other factors’ include *habits* like intensity of media consumption, intensity of digital communication, and religious activity, or *life experiences* such as household composition, financial vulnerability, mental stress, and geographic situation (rural or urban, nation). Naturally, education and age will play a crucial role in our visualization just as they did in The Economist’s article. 

The *ideological outcomes* we will investigate include placement on the liberal-conservative scale, tolerance for immigrants and LGBTQ lifestyles, climate change beliefs, trust in politicians, democracy, and institutions, and participation in political activism. This set both captures and expands the focus of The Economist’s analysis.

Our visualization will be geared toward the general public, and especially those interested in societal opinions. It will be accessible, clear, and, given the fraught nature of political discourse, as inoffensive as possible. Our story will shed light on the direction of culture and political outcomes at the broadest level; accordingly, we want to impart an understanding of humanity’s direction while ensuring our audience is willing to share this resource with others. 

Summarizing questions:

- How do social norms and political attitudes vary by generation and gender?
- Which habits (eg media consumption) or life situations (eg financial vulnerability) might create these differences?
- How can we design a universally inoffensive visualization on this topic?

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data

Data for the ESS has been collected every two years between 2002 and 2020 (inclusive), constituting 10 different rounds. The composition of participating countries over time can be seen below; 39 countries participated at least once while 15 participated in each round.

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/participants.png "participants")

All categorical variables are encoded numerically. Furthermore, each variable has a codebook to help us interpret the values. For one example, for the variable “highest level of education obtained” (*edulvla* in the dataset), we have the following values:

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/codebook.png "codebook")

Most variables follow a similar encoding. As a result, we can retain variables of interest and calculate their availability over time. The following is a list of the variables we are currently interested in:

1. Media consumption: newspol, newsppol, newsptot, rdpol, rdtot, tvpol, tvtot
2. Digital communication: netuse, netusoft, netustm
3. Religious activity: pray, rlgatnd, rlgdgr, rlgblg, rlgblge
4. Household composition: hhmmb, gndr*i* (*i* = person i in respondent’s household)
5. Financial vulnerability: hincfel, hinctnt, uemp12m
6. Mental Stress: hlthhmp, inmdisc, brghmef, crvctef, happy, health
7. Social life/Loneliness: inprdsc, sclact, sclmeet
8. Geographic Situation: region, region*cc* (*cc =* country code)
9. Gender: gndr
10. Age: yrbrn
11. Education: edlv*cc*, edlvp*cc* (*cc =* country code)
12. Ideological Outcomes:
    1. Liberal-Conservative Scale: lrscale
    2. Tolerance for Immigrants: imwbcnt, imueclt, imdfetn, impcntr
    3. Tolerance for LGBTQ lifestyles: freehms, hmsacld, hmsfmlsh
    4. Climate Change Beliefs: ccnthum, ccrdprs, wrclmch
    5. Trust in Governance: trstlgl, trstplc, trstprl, trstplt
    6. Political Activism: badge, bctprd, pbldmn

[Link](https://drive.switch.ch/index.php/s/C1ZODnHmBgECjqc) to selected variables in the dataset
Most variables are missing data for few to no respondents, though a nonnegligible portion have up to 80% of data missing (see histogram below). We may add other variables to this set, in particular if stratification along gender and age lines could produce further interesting divisions.

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/missings.png "missings")

Finally, we show average of self-reported political leanings (lower = more liberal) for women and men as a proof of concept:

![alt text](https://github.com/com-480-data-visualization/ChartToppers/raw/master/m1_images/ideological_differences.png "ideological_differences")

### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

## Milestone 2 (26th April, 5pm)

**10% of the final grade**


## Milestone 3 (31st May, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

